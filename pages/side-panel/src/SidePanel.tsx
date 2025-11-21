import '@src/SidePanel.css';
import { t } from '@extension/i18n';
import { PROJECT_URL_OBJECT, useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn, ErrorDisplay, LoadingSpinner, ToggleButton } from '@extension/ui';
import { ChatCompletionMessageParam, ExtensionServiceWorkerMLCEngine } from '@mlc-ai/web-llm';
import { useEffect } from 'react';

const SidePanel = () => {
  const { isLight } = useStorage(exampleThemeStorage);
  const logo = isLight ? 'side-panel/logo_vertical.svg' : 'side-panel/logo_vertical_dark.svg';

  const goGithubSite = () => chrome.tabs.create(PROJECT_URL_OBJECT);

  // TEST
  useEffect(() => {
    loadWebllmEngine();
  }, []);

  const engine = new ExtensionServiceWorkerMLCEngine({
    initProgressCallback: progress => {
      console.log(progress.text);
    },
  });

  // eslint-disable-next-line func-style
  async function loadWebllmEngine() {
    const options = await chrome.storage.sync.get({
      temperature: 0.5,
      contextLength: 4096,
      model: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
    });
    await engine.reload(options['model'], {
      context_window_size: options['contextLength'],
      temperature: options['temperature'],
    });
    console.log('Engine loaded.');
  }

  // eslint-disable-next-line func-style
  async function testPrompt() {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is the capital of France?' },
    ];
    const completion = await engine.chat.completions.create({
      stream: true,
      messages,
      temperature: 0.7,
    });

    let curMessage = '';
    for await (const chunk of completion) {
      const curDelta = chunk.choices[0].delta.content;
      if (curDelta) {
        curMessage += curDelta;
      }

      console.log('Current message:', curMessage);
    }
  }

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')}>
      <header className={cn('App-header', isLight ? 'text-gray-900' : 'text-gray-100')}>
        <ToggleButton onClick={async () => await testPrompt()}>Test Prompt</ToggleButton>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
