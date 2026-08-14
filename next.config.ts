import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * As páginas leem os markdowns do disco em tempo de request. O Next não
   * consegue rastrear esse tipo de leitura sozinho, então os arquivos precisam
   * ser incluídos no bundle na mão — senão o deploy sobe sem eles.
   */
  outputFileTracingIncludes: {
    "/": ["./CHANGELOG.md", "./WEEKLY-LOG.md"],
    "/email": ["./CHANGELOG.md", "./WEEKLY-LOG.md"],
    "/atualizacoes": ["./CHANGELOG.md"],
  },
};

export default nextConfig;
