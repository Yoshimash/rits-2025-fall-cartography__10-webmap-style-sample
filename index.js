// Maplibre GL JSを使用してウェブ地図を作成するJavaScriptファイル

// 新しい地図オブジェクトを作成します
const map = new maplibregl.Map({
    // container: 地図を表示するHTML要素のIDを指定
    // index.htmlの<div id="map"></div>に地図が表示されます
    container: 'map',

    // style: 地図の見た目（スタイル）を決めるURL
    style: {
      version: 8,

      // ソース。地図データの取得元を指定
      sources: {
        // raster
        'raster-source': {
          type: 'raster',
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
        },

        kokudosuuchi1:{
          type:'geojson',
          data:'./data1.geojson'
        },
        kokudosuuchi2:{
          type:'geojson',
          data:'./data2.geojson'
        }
      },


        
      // レイヤ。配置順に描画される
      layers: [
       {
        id:'basemap',
        source:'raster-source',
        type:'raster',
       },
          
       {id:'kokudosuuchi1-rayer',
        source:'kokudosuuchi1',
        type:'fill',
        filter:['==','$type','Polygon'],
        paint:{
          'fill-color':[
            'case',
            ['==',['get','A31a_305'],1],
            'yellow',
            'blue'
          ],
          'fill-opacity':0.6,
        }
       },
      
{
  id:'kokudosuuchi1-symbol',
  source:'kokudosuuchi1',
  type:'symbol',
layout:{
  'text-field':[
    'case',
    ['==',['get','A31a_305'],1],
    '注意',
        ['==',['get','A31a_305'],2],
    '危険',
    '超危険'
  ]
},

sources: {
  'raster-source': {
    type: 'raster',
    tiles: [
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    ],
    tileSize: 256
  },

  'kokudosuuchi2': {
    type: 'geojson',
    data: '/data/A31a-30-24_23_8505080099_20.geojson'
  }
},

layers: [
  {
    id: 'basemap',
    source: 'raster-source',
    type: 'raster',
  },

  {
    id: 'kokudosuuchi2-rayer',
    source: 'kokudosuuchi2',
    type: 'fill',
    filter: ['==', '$type', 'Polygon'],
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'A31a_305'], 1],
        'yellow',
        'green'
      ],
      'fill-opacity': 0.6,
    }
  },

  {
    id: 'kokudosuuchi2-symbol',
    source: 'kokudosuuchi2',
    type: 'symbol',
    layout: {
      'text-field': [
        'case',
        ['==', ['get', 'A31a_305'], 1],
        '注意',
        ['==', ['get', 'A31a_305'], 2],
        '危険',
        '超危険'
      ]
    }
  }
]
   
 // A31a_305
}
      //   {
      //     id:'kokudosuuchi1-symbol-rayer',
      //     source:'kokudosuuchi1',
      //     type:'symbol',
      //     layout:{
      //       'text-field':[
      //         'concat',
      //         '浸水ランク',
      //         ['get','A31a_205'],
      //         ]
      //            }
      //   },


       
        // ベクトルタイルレイヤ は次回の授業で解説します
        // TODO: 簡単な Interpolate の例
      ]
    },

    // center: 地図の初期表示位置を経度・緯度で指定
    // [経度, 緯度] の順番で指定します
    center: [139.6917, 35.6895], // 東京駅付近

    // zoom: 地図の初期ズームレベルを指定
    // 数値が大きいほど拡大表示されます
    zoom: 1,

    // hash: URLのハッシュ部分に地図の位置情報を反映させるかどうか
    hash: true,

    //maxZoom: 12,
    minZoom: 4,
});

// クリックした時のインタラクション
map.on('click', function (e) {
    const features = map.queryRenderedFeatures(e.point, { layers: ['my-data_circle-layer', 'my-data_symbol-layer'] });
    if(features.length > 0){
        const feature = features[0];
        alert('クリックした地物:\n' + feature.properties.name);
    }
})

