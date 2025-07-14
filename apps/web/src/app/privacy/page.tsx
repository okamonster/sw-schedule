export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-20 px-4">
      <div className="max-w-none">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>

        <div className="grid gap-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. 基本方針</h2>
            <p className="mb-2">
              Gemba!（以下「当サービス」といいます）は、ユーザーの個人情報の保護を最重要事項と考え、個人情報保護法を遵守し、適切な収集、利用、管理を行います。
            </p>
            <p>
              本プライバシーポリシーは、当サービスにおける個人情報の取り扱いについて定めるものです。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. 収集する個人情報</h2>
            <div className="space-y-4">
              <p>
                <strong>2.1 アカウント情報</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>メールアドレス</li>
                <li>ユーザー名</li>
                <li>プロフィール画像</li>
                <li>居住地域</li>
              </ul>

              <p>
                <strong>2.2 利用履歴情報</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>フォローしているアーティスト情報</li>
                <li>イベントの閲覧・検索履歴</li>
                <li>カレンダー同期設定</li>
                <li>アプリの利用状況</li>
              </ul>

              <p>
                <strong>2.3 技術的情報</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IPアドレス</li>
                <li>ブラウザ情報</li>
                <li>デバイス情報</li>
                <li>アクセスログ</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. 個人情報の利用目的</h2>
            <div className="space-y-4">
              <p>当サービスは、収集した個人情報を以下の目的で利用します：</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>ユーザー認証・アカウント管理</li>
                <li>推しアーティストの管理・推薦機能の提供</li>
                <li>イベント情報の配信・通知</li>
                <li>Googleカレンダーとの同期機能</li>
                <li>サービス改善・新機能開発</li>
                <li>不正利用の防止・セキュリティ対策</li>
                <li>お問い合わせ対応</li>
                <li>利用規約違反の調査・対応</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. 個人情報の共有・提供</h2>
            <div className="space-y-4">
              <p>
                <strong>4.1 第三者への提供</strong>
              </p>
              <p className="mb-2">
                当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません：
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>ユーザーの事前の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合</li>
              </ul>

              <p>
                <strong>4.2 委託先への提供</strong>
              </p>
              <p>
                当サービスは、サービスの提供に必要な範囲で、個人情報の取り扱いを委託先に委託することがあります。この場合、委託先との間で適切な契約を締結し、個人情報の適切な管理を求めます。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. 個人情報の管理・保護</h2>
            <div className="space-y-4">
              <p>
                <strong>5.1 セキュリティ対策</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>SSL暗号化通信の採用</li>
                <li>アクセス制御の実施</li>
                <li>定期的なセキュリティ監査</li>
              </ul>

              <p>
                <strong>5.2 データの保持期間</strong>
              </p>
              <p>
                当サービスは、利用目的の達成に必要な期間、個人情報を保持します。アカウント削除時には、関連する個人情報を適切に削除または匿名化します。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. ユーザーの権利</h2>
            <div className="space-y-4">
              <p>ユーザーは、以下の権利を有します：</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・追加・削除請求</li>
                <li>個人情報の利用停止・消去請求</li>
                <li>個人情報の第三者提供の停止請求</li>
                <li>アカウントの削除</li>
              </ul>
              <p>
                これらの請求については、当サービスが定める方法によりお申し込みください。合理的な範囲で対応いたします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              7. クッキー・トラッキング技術
            </h2>
            <div className="space-y-4">
              <p>
                <strong>7.1 クッキーの使用</strong>
              </p>
              <p className="mb-2">当サービスは、以下の目的でクッキーを使用します：</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>ユーザー認証の維持</li>
                <li>ユーザー設定の保存</li>
                <li>サービス利用状況の分析</li>
                <li>パフォーマンスの改善</li>
              </ul>

              <p>
                <strong>7.2 分析ツール</strong>
              </p>
              <p>
                当サービスは、サービス改善のため、Google
                Analytics等の分析ツールを使用することがあります。これらのツールは、個人を特定しない形で利用状況を分析します。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. 外部サービスとの連携</h2>
            <div className="space-y-4">
              <p>
                <strong>8.1 Googleカレンダー連携</strong>
              </p>
              <p className="mb-2">
                当サービスは、ユーザーの同意に基づき、Googleカレンダーとの連携機能を提供します。この機能を使用する場合：
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Googleアカウントへのアクセス権限が必要です</li>
                <li>イベント情報がGoogleカレンダーに同期されます</li>
                <li>Googleのプライバシーポリシーが適用されます</li>
              </ul>

              <p>
                <strong>8.2 地図サービス</strong>
              </p>
              <p>
                イベント会場の地図表示には、Google
                Maps等の外部サービスを使用します。これらのサービスは、それぞれのプライバシーポリシーに従って運営されます。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. 未成年者の個人情報</h2>
            <div className="space-y-4">
              <p>
                当サービスは、未成年者の個人情報についても適切に取り扱います。未成年者が当サービスを利用する場合は、保護者の同意を得てから利用してください。
              </p>
              <p>
                保護者の方は、お子様の個人情報の開示、訂正、削除等の請求について、当サービスまでお問い合わせください。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              10. プライバシーポリシーの変更
            </h2>
            <div className="space-y-4">
              <p>
                当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、当サービス内でのお知らせまたはメールにより通知いたします。
              </p>
              <p>
                変更後のプライバシーポリシーは、当サービス内に掲載された時点から効力を生じるものとします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. お問い合わせ</h2>
            <div className="space-y-4">
              <p>
                本プライバシーポリシーに関するお問い合わせ、個人情報の開示・訂正・削除等の請求については、以下の方法でお問い合わせください：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Gemba! 問い合わせ</p>
                <p>メール: gemba.live.app@gmail.com</p>
              </div>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              制定日: 2025年7月15日
              <br />
              最終更新日: 2025年7月15日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
