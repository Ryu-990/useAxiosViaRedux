// このオプションのコードは、サービス ワーカーを登録するために使用されます。
// register() はデフォルトでは呼び出されません。
// これにより、本番環境での次回のアクセス時にアプリの読み込みが高速化され、オフライン機能が提供されます。
// ただし、これは、以前にキャッシュされたリソースがバックグラウンドで更新されるため、
// 開発者 (およびユーザー) がページに次回アクセスしたときには、
// ページで開いている既存のタブがすべて閉じられた後にのみ、展開された更新が表示されることも意味します。
// このモデルの利点とオプトインの方法の詳細については、http://bit.ly/CRA-PWA を参照してください。

const isLocalhost: boolean = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] は IPv6 ローカルホスト アドレスです。
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 は IPv4 
  /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/.exec(window.location.hostname)
  /*
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )*/
);

interface Config {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

export function register(config?: Config): void {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL コンストラクターは、SW をサポートするすべてのブラウザーで使用できます。
    const publicUrl = new URL(process.env.PUBLIC_URL || '', window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      /* PUBLIC_URL がページが提供されているオリジンと異なる場合、サービスワーカーは動作しません。
      これは、CDN を使用してアセットを提供している場合に発生する可能性があります。
      https://github.com/facebook/create-react-app/issues/2374 を参照してください。*/
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // これは localhost で実行されています。サービス ワーカーがまだ存在するかどうかを確認しましょう。
        checkValidServiceWorker(swUrl, config);

        // localhost にいくつかの追加ログを追加し、開発者にサービス ワーカー/PWA ドキュメントを示します。
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'この Web アプリは、サービス ワーカーによってキャッシュ ファーストで提供されています。詳細については、http://bit.ly/CRA-PWA にアクセスしてください'
          );
        });
      } else {
        // localhost ではありません。サービス ワーカーを登録するだけです
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config): void {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              /* この時点で、更新されたプリキャッシュされたコンテンツが取得されていますが、
              以前のサービスワーカーは、すべてのクライアントタブが閉じられるまで、古いコンテンツを提供します。*/
              console.log(
                '新しいコンテンツが利用可能であり、このページのすべての ' +
'タブが閉じられたときに使用されます。http://bit.ly/CRA-PWA を参照してください。'
              );

              // コールバックを実行します
              if (config?.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // この時点で、すべてが事前キャッシュされています。
// 「コンテンツはオフライン使用のためにキャッシュされています。」というメッセージを表示するのに最適なタイミングです。
              console.log('Content is cached for offline use.');

              // コールバックを実行します
              if (config?.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

  // Service Worker が見つかるかどうかを確認します。見つからない場合は、ページを再読み込みします。
function checkValidServiceWorker(swUrl: string, config?: Config): void {
  fetch(swUrl)
    .then(response => {// サービスワーカーが存在し、実際に JS ファイルを取得していることを確認します。
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType && !contentType.includes('javascript'))) {
        // サービスワーカーが見つかりません。おそらく別のアプリです。ページを再読み込みしてください。
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // サービスワーカーが見つかりました。通常どおり続行します。
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
