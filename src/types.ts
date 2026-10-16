export interface ProfileInfo {
  key: string;
  name: string;
  kind: string;
  description: string;
  harness: string;
}

export interface ServerHealth {
  status: string;
  protocol: string;
  default_profile: string;
}
