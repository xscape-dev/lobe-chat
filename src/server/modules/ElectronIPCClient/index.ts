import { ElectronIpcClient } from '@lobechat/electron-server-ipc';

class LobeHubElectronIpcClient extends ElectronIpcClient {
  // 获取数据库路径
  getDatabasePath = async (): Promise<string> => {
    return this.sendRequest<string>('getDatabasePath');
  };

  // 获取用户数据路径
  getUserDataPath = async (): Promise<string> => {
    return this.sendRequest<string>('getUserDataPath');
  };

  getDatabaseSchemaHash = async () => {
    return this.sendRequest<string>('setDatabaseSchemaHash');
  };

  setDatabaseSchemaHash = async (hash: string | undefined) => {
    if (!hash) return;

    return this.sendRequest('setDatabaseSchemaHash', hash);
  };
}

export const electronIpcClient = new LobeHubElectronIpcClient();
