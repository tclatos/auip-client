import React, { useEffect, useMemo, useState } from 'react';
import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useAgUiRuntime } from '@assistant-ui/react-ag-ui';
import { HttpAgent } from '@ag-ui/client';
import { Header } from './components/Header';
import { ChatThread } from './components/ChatThread';
import type { ProfileInfo, ServerHealth } from './types';

const DEFAULT_BACKEND_URL = 'http://localhost:8000';

const FALLBACK_PROFILES: ProfileInfo[] = [
  { key: 'research', name: 'Research Agent', kind: 'DeepAgent', description: 'Autonomous research agent with web & file tools', harness: 'langchain' },
  { key: 'coding', name: 'Coding Agent', kind: 'DeepAgent', description: 'CodeAct Python sandbox agent', harness: 'langchain' },
  { key: 'browser_agent', name: 'Browser Agent', kind: 'DeepAgent', description: 'Playwright autonomous browser agent', harness: 'langchain' },
  { key: 'fake', name: 'Fake Test Agent', kind: 'React', description: 'Fast offline mock agent for testing', harness: 'langchain' },
];

export const App: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileInfo[]>(FALLBACK_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState<string>('research');
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState<boolean>(true);

  // Check backend health and fetch discoverable profiles
  useEffect(() => {
    let isMounted = true;

    async function checkHealthAndProfiles() {
      try {
        const healthRes = await fetch(`${DEFAULT_BACKEND_URL}/health`);
        if (healthRes.ok) {
          const healthData: ServerHealth = await healthRes.json();
          if (isMounted) {
            setIsOnline(true);
            if (healthData.default_profile && !selectedProfile) {
              setSelectedProfile(healthData.default_profile);
            }
          }

          const profilesRes = await fetch(`${DEFAULT_BACKEND_URL}/profiles`);
          if (profilesRes.ok) {
            const profilesData: ProfileInfo[] = await profilesRes.json();
            if (isMounted && profilesData.length > 0) {
              setProfiles(profilesData);
              if (!profilesData.some((p) => p.key === selectedProfile)) {
                setSelectedProfile(profilesData[0].key);
              }
            }
          }
        } else {
          if (isMounted) setIsOnline(false);
        }
      } catch {
        if (isMounted) setIsOnline(false);
      } finally {
        if (isMounted) setIsLoadingProfiles(false);
      }
    }

    checkHealthAndProfiles();
    const interval = setInterval(checkHealthAndProfiles, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Create HttpAgent pointing to AG-UI endpoint with selected profile
  const agent = useMemo(() => {
    return new HttpAgent({
      url: `${DEFAULT_BACKEND_URL}/agent?profile=${encodeURIComponent(selectedProfile)}`,
      headers: {
        'x-agent-profile': selectedProfile,
      },
    });
  }, [selectedProfile]);

  // Connect AG-UI runtime adapter
  const runtime = useAgUiRuntime({ agent: agent as any });

  const currentProfile = profiles.find((p) => p.key === selectedProfile);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <Header
        profiles={profiles}
        selectedProfile={selectedProfile}
        onSelectProfile={setSelectedProfile}
        isOnline={isOnline}
        isLoadingProfiles={isLoadingProfiles}
      />

      <main className="flex-1 overflow-hidden relative">
        <AssistantRuntimeProvider runtime={runtime}>
          <ChatThread agentName={currentProfile?.name || selectedProfile} />
        </AssistantRuntimeProvider>
      </main>
    </div>
  );
};

export default App;
