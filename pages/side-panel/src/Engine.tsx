import { ExtensionServiceWorkerMLCEngine } from '@mlc-ai/web-llm';

export const engine = new ExtensionServiceWorkerMLCEngine({
    initProgressCallback: progress => {
      console.log(progress.text);
    },
  });