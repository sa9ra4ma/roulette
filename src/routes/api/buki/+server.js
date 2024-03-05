import OpenAI from 'openai';

export async function POST({ request }) {
  const req = await request.json();
  const message = `
  あなたはスプラトゥーンの武器をおススメする役目です。
ユーザーからの要望に適した武器を1つ選んで回答してください。
以下に武器の名前と特徴の一覧をcsv形式で提示します。
-------------
ボールドマーカー,弾速速い
ボールドマーカーネオ,特殊性能高め
わかばシューター,初心者向け
もみじシューター,中距離戦に適している
シャープマーカー,弾速速い
シャープマーカーネオ,サブウェポン性能高め
プロモデラーMG,近距離戦に適している
プロモデラーRG,サブウェポン性能高め
スプラシューター,ベーシック
スプラシューターコラボ,サブウェポン性能高め
.52ガロン,威力高め
N-ZAP85,長射程
N-ZAP89,スペシャル性能高め
プライムシューター,威力高め
プライムシューターコラボ,スペシャル性能高め
.96ガロン,威力高め
.96ガロンデコ,特殊性能高め
ジェットスイーパー,長射程
ジェットスイーパーカスタム,サブウェポン性能高め
L3リールガン,弾速速い
L3リールガンD,特殊性能高め
H3リールガン,威力高め
H3リールガンD,チャージが速い
-----------


回答の形式は以下です
---------------
【武器名】
理由を30文字以内
---------------

ユーザーからの要望は以下です。
-------------
${req.message}
-------------
  `;
  const openai = new OpenAI({apiKey:''});
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-3.5-turbo',
  });
  const resMessage = chatCompletion.choices[0].message;
  return new Response(JSON.stringify(resMessage));
  // return new Response(JSON.stringify({role:"a",contents:"スプラシューター！！！！"}));
}
