import { Artifact, ArtifactsSource, BuildInfo } from "hardhat/types";

export class HardhatDeployArtifactsSource implements ArtifactsSource {
  constructor(private _deploymentsPath: string) {}

  public async readArtifact(
    contractNameOrFullyQualifiedName: string
  ): Promise<Artifact | undefined> {
    throw new Error("Method not implemented.");
  }

  public readArtifactSync(
    contractNameOrFullyQualifiedName: string
  ): Artifact | undefined {
    throw new Error("Method not implemented.");
  }

  public async artifactExists(
    contractNameOrFullyQualifiedName: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async getAllFullyQualifiedNames(): Promise<string[]> {
    // minimal valid implementation
    return [];
  }

  public async getBuildInfo(
    fullyQualifiedName: string
  ): Promise<BuildInfo | undefined> {
    // minimal valid implementation
    return undefined;
  }

  public async getArtifactPaths(): Promise<string[]> {
    // minimal valid implementation
    return [];
  }

  public async getDebugFilePaths(): Promise<string[]> {
    // minimal valid implementation
    return [];
  }

  public async getBuildInfoPaths(): Promise<string[]> {
    // minimal valid implementation
    return [];
  }

  // not impelementing this method is fine if there is no caching
  public clearCache() {}

  // not impelementing this method is fine if there is no caching
  public disableCache() {}
}
