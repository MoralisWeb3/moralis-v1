import { EndpointFactory, EndpointResolver } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { SolApiConfigSetup } from './config/SolApiConfigSetup';
import { getBalance } from './resolvers/account/getBalance';
import { getNFTs } from './resolvers/account/getNFTs';
import { getPortfolio } from './resolvers/account/getPortfolio';
import { getSPL } from './resolvers/account/getSPL';
import { getNFTMetadata } from './resolvers/nft/getNFTMetadata';

export const BASE_URL = 'https://solana-gateway.moralis.io';

export class MoralisSolApi extends ApiModule {
  public static readonly moduleName = 'solApi';

  public static create(core?: MoralisCore): MoralisSolApi {
    return new MoralisSolApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisSolApi.moduleName, core, BASE_URL);
  }

  public setup() {
    SolApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public readonly account = {
    getBalance: this.createFetcher(getBalance),
    getNFTs: this.createFetcher(getNFTs),
    getPortfolio: this.createFetcher(getPortfolio),
    getSPL: this.createFetcher(getSPL),
  };

  public readonly nft = {
    getNFTMetadata: this.createFetcher(getNFTMetadata),
  };

  private createFetcher<AP, P, AR, ADR, JR>(factory: EndpointFactory<AP, P, AR, ADR, JR>) {
    return EndpointResolver.create(this.core, factory).fetch;
  }
}