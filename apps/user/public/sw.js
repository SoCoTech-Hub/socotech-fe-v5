if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const o=e=>i(e,c),d={module:{uri:c},exports:n,require:o};s[c]=Promise.all(r.map((e=>d[e]||o(e)))).then((e=>(a(...e),n)))}}define(["./workbox-d62e0b8a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/user/Application.gif",revision:"17ed479f0c482f047eef6ab76c732bfb"},{url:"/user/Application.svg",revision:"4a81f3d46a88d9bac93518cab78567b6"},{url:"/user/ApplicationActiveIcon.svg",revision:"c585175d3851ec0b250800e76946f8a3"},{url:"/user/BursariesActiveIcon.svg",revision:"85cb7ab8ac54ad83b9668eb703aec358"},{url:"/user/BursaryIcon.svg",revision:"d8f770c721007f3a5f4c780bdd067c29"},{url:"/user/CancelSub.png",revision:"488b7fcc27309a72465a842da507a4d9"},{url:"/user/DashboardActiveIcon.svg",revision:"f83baa413c0cbd22023e9ccfe7904bfe"},{url:"/user/FacebookActiveIcon.svg",revision:"8b19a636141ca160329c42d28e8ba97f"},{url:"/user/FacebookIcon.svg",revision:"8eaaef41914cecb4b826421672263f4e"},{url:"/user/Icon_Biological.svg",revision:"87ec3c5efac5d47e6f053527aec4944b"},{url:"/user/Icon_Contact.svg",revision:"6b2acf3c1e10adf1207923c51f90a422"},{url:"/user/Icon_Device.svg",revision:"0e47b270972dab474f92947207d5500d"},{url:"/user/Icon_NextOfKin.svg",revision:"f0331fe52c1ce9c2c4d17d126cc6982a"},{url:"/user/Icon_School.svg",revision:"809ab9ee4df88383a715cd5c24f639d3"},{url:"/user/InstagramActiveIcon.svg",revision:"6db8ad32c53b76a8792ce99b62dac8f9"},{url:"/user/InstagramIcon.svg",revision:"4bbb2a088c5ccfd7ea25175e613720d5"},{url:"/user/ProfileActiveIcon.svg",revision:"284c2cd06ffe898a8b36c8a63fa2a313"},{url:"/user/TikTokActiveIcon.svg",revision:"1b52544678a92e27e6bf9e7d762df646"},{url:"/user/TikTokIcon.svg",revision:"214a9d8fdb2c406e099d7ec724877b1f"},{url:"/user/_next/static/chunks/118-3d4bd3c226fcf736ad7a.js",revision:"3d4bd3c226fcf736ad7a"},{url:"/user/_next/static/chunks/457-e37f373a04ccdb6cd946.js",revision:"e37f373a04ccdb6cd946"},{url:"/user/_next/static/chunks/670-4862bff67de395f3e96a.js",revision:"4862bff67de395f3e96a"},{url:"/user/_next/static/chunks/98-63c47d3cebce3ccf8e97.js",revision:"63c47d3cebce3ccf8e97"},{url:"/user/_next/static/chunks/framework-6c6eb080c4d41d8fd79b.js",revision:"6c6eb080c4d41d8fd79b"},{url:"/user/_next/static/chunks/main-6b2c8c782c63ce64c0bd.js",revision:"6b2c8c782c63ce64c0bd"},{url:"/user/_next/static/chunks/pages/404-d0b92746ee7d7abdcfda.js",revision:"d0b92746ee7d7abdcfda"},{url:"/user/_next/static/chunks/pages/500-e7cd2a3a5b0defb843d3.js",revision:"e7cd2a3a5b0defb843d3"},{url:"/user/_next/static/chunks/pages/_app-47957d7690733e08bab8.js",revision:"47957d7690733e08bab8"},{url:"/user/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"737a04e9a0da63c9d162"},{url:"/user/_next/static/chunks/pages/accountSettings-2a386d42a93e7bd64484.js",revision:"2a386d42a93e7bd64484"},{url:"/user/_next/static/chunks/pages/affiliate-d4a219b5a7eb85b732ff.js",revision:"d4a219b5a7eb85b732ff"},{url:"/user/_next/static/chunks/pages/affiliate/register-836e0bf73e66e17bc8e4.js",revision:"836e0bf73e66e17bc8e4"},{url:"/user/_next/static/chunks/pages/affiliate/transaction-60eb6408768329d749db.js",revision:"60eb6408768329d749db"},{url:"/user/_next/static/chunks/pages/applications-b1b0fb6d1e673e19d1b0.js",revision:"b1b0fb6d1e673e19d1b0"},{url:"/user/_next/static/chunks/pages/applications/%5Buniversity%5D-b9783076fdfb0f5732a7.js",revision:"b9783076fdfb0f5732a7"},{url:"/user/_next/static/chunks/pages/applications/%5Buniversity%5D/%5Bid%5D-61a16b2ae332081dc498.js",revision:"61a16b2ae332081dc498"},{url:"/user/_next/static/chunks/pages/billing-cef18090005787665383.js",revision:"cef18090005787665383"},{url:"/user/_next/static/chunks/pages/bursaries-98e72a1a9831c54415b8.js",revision:"98e72a1a9831c54415b8"},{url:"/user/_next/static/chunks/pages/bursaries/%5Buniversity%5D-644bdb23d03f857d4761.js",revision:"644bdb23d03f857d4761"},{url:"/user/_next/static/chunks/pages/bursaries/%5Buniversity%5D/%5Bid%5D-3a2d5d258a8c003eb7e4.js",revision:"3a2d5d258a8c003eb7e4"},{url:"/user/_next/static/chunks/pages/events-fb72f595c2778698b261.js",revision:"fb72f595c2778698b261"},{url:"/user/_next/static/chunks/pages/events/edit-0776da89a280092d4701.js",revision:"0776da89a280092d4701"},{url:"/user/_next/static/chunks/pages/events/weekly-90041cd8383e7fb3797e.js",revision:"90041cd8383e7fb3797e"},{url:"/user/_next/static/chunks/pages/index-e514c51a981239d86aba.js",revision:"e514c51a981239d86aba"},{url:"/user/_next/static/chunks/pages/invoice-d9cc21d30f532db5c89f.js",revision:"d9cc21d30f532db5c89f"},{url:"/user/_next/static/chunks/pages/unsubscribe-546fd2534e0e4b02426e.js",revision:"546fd2534e0e4b02426e"},{url:"/user/_next/static/chunks/pages/userdashboard-6daa58e39e5364a99971.js",revision:"6daa58e39e5364a99971"},{url:"/user/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/user/_next/static/chunks/webpack-58d178dd8f19b457f494.js",revision:"58d178dd8f19b457f494"},{url:"/user/_next/static/css/be82099af2ef6ba3d720.css",revision:"be82099af2ef6ba3d720"},{url:"/user/_next/static/css/f0301ddca23ab72b5c95.css",revision:"f0301ddca23ab72b5c95"},{url:"/user/_next/static/media/Helvetica-Bold.ed57aca7292971d8548c4554f08c0255.ttf",revision:"d13db1fed3945c3b8c3293bfcfadb32f"},{url:"/user/_next/static/media/Helvetica.06113bf748ae7dc33e05189a90815625.ttf",revision:"1b580d980532792578c54897ca387e2c"},{url:"/user/_next/static/media/themify.29b39089170885ae29671a8c66d85a9f.woff",revision:"a1ecc3b826d01251edddf29c3e4e1e97"},{url:"/user/_next/static/media/themify.9bad94440d49256265a5b2305ec42d63.eot",revision:"2c454669bdf3aebf32a1bd8ac1e0d2d6"},{url:"/user/_next/static/media/themify.c4292f34297f1004471aa089024b1ccc.svg",revision:"cba68f986e60df8c74f4a53c3e39595c"},{url:"/user/_next/static/media/themify.eda8b94308c6f538f04a8056ed761a57.ttf",revision:"e23a7dcaefbde4e74e263247aa42ecd7"},{url:"/user/_next/static/rEEegb4dGjXhZRpH4PZEG/_buildManifest.js",revision:"c4149b0a024343fd5ed5479de3a97416"},{url:"/user/_next/static/rEEegb4dGjXhZRpH4PZEG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/user/about_grade.svg",revision:"af39be2ff08cecd10981af485c72c33c"},{url:"/user/about_location.svg",revision:"721cc8ce56ca695ebefc34e64fc1c86c"},{url:"/user/about_school.svg",revision:"4b7a248793d8e57f15786e13442f814b"},{url:"/user/agriSci.svg",revision:"c54ba7338b5835fa4a96881de55dffdb"},{url:"/user/applications-tour.png",revision:"15ef3baf76c3f4f898dd3b92d58eaa79"},{url:"/user/artSocialSci.svg",revision:"0ff3ba2252ef87924fbdf6dea67eb698"},{url:"/user/attachment.svg",revision:"058a3c15114e2035adf4d613ea6bd2da"},{url:"/user/attachment_white.svg",revision:"bb5c9803f80402eef7511b09f21b2c90"},{url:"/user/avatar_default.png",revision:"c01260f3bb43f642b87a083a090cdae9"},{url:"/user/bell.svg",revision:"7221b44f2aeec9914c10034c09bb3718"},{url:"/user/browserconfig.xml",revision:"91489e9cf4a8c2844bc3dd24cb20e66a"},{url:"/user/bursaries_banner.gif",revision:"10a202607ddba367471a303c2994d7ca"},{url:"/user/bursaries_banner.png",revision:"b6d958b355d8c912785507c029ef950b"},{url:"/user/camera_icon.svg",revision:"59137dd1d55b64e371c75fab166737ea"},{url:"/user/close-img.svg",revision:"048eed439854d5d26e13664e2ca9a0e3"},{url:"/user/cover.jpg",revision:"4634556c00cc282ba6debe6d8510049e"},{url:"/user/dashboard_icon.svg",revision:"d84ec3722711f88fa3b2fcdc6af429c8"},{url:"/user/digilib_articles.png",revision:"b3280184ec27a9c65d3b128fc6ed4d70"},{url:"/user/digilib_communication.png",revision:"b272fe86558746751e2d9b3eb3afd5d7"},{url:"/user/digilib_eresource.png",revision:"b21fe2f18a29416f2744de3a98606f09"},{url:"/user/digilib_gettingstarted.png",revision:"ae97a6f1f1610174cd6ea404741773bd"},{url:"/user/digilib_pastexam.png",revision:"d695e55cf2c38fd7a8da4129d761eace"},{url:"/user/digilib_survey.png",revision:"3d7bf15b1ff34b9e4a235cdba1223b78"},{url:"/user/digilib_welcome.png",revision:"cddbec255ed7a779d516a07467afa584"},{url:"/user/ecoSci.svg",revision:"06b890b5cb010679126f5d4881ea943d"},{url:"/user/education.svg",revision:"efe86773304a793407ef16b4d1968a21"},{url:"/user/engineering.svg",revision:"a40c07b3ab7e1c3832f548dab6b474d7"},{url:"/user/favicon.ico",revision:"b7a5327e60b230b81a31c0233691dce3"},{url:"/user/favicon.png",revision:"341e12124525c189948cd22a8e9feac8"},{url:"/user/featureimage.jpg",revision:"411467e6bc73678c70f1b1de9312c3b9"},{url:"/user/heart.svg",revision:"9bd080f088d45a01334de5f10ceb116c"},{url:"/user/hello.gif",revision:"7501a322be3128ec979646e7955a4ebf"},{url:"/user/hello.svg",revision:"7b939a43a6003b7401b7d4740e952b60"},{url:"/user/icons/android/android-launchericon-144-144.png",revision:"f51fef1d28eef3cc766330f6d03fa2f5"},{url:"/user/icons/android/android-launchericon-192-192.png",revision:"fb288fcbbb7c9f47f5362e14b0f2f33f"},{url:"/user/icons/android/android-launchericon-48-48.png",revision:"b8446d62b387160e5494815e1f2d61a7"},{url:"/user/icons/android/android-launchericon-512-512.png",revision:"341e12124525c189948cd22a8e9feac8"},{url:"/user/icons/android/android-launchericon-72-72.png",revision:"b2b449d913d792b5ed8a7b350d0b321e"},{url:"/user/icons/android/android-launchericon-96-96.png",revision:"ad2fd3e87d10b464b19f601ef37c3893"},{url:"/user/icons/icons.json",revision:"5dbbc3fe59816e65ba28e355a58ea45c"},{url:"/user/icons/ios/100.png",revision:"60f35b4a05d267001f56a13d1a2336c9"},{url:"/user/icons/ios/1024.png",revision:"9095c33f1d1851f31c07268184832b84"},{url:"/user/icons/ios/114.png",revision:"5e17a20589b4373a4c0db9bf3f3caa8c"},{url:"/user/icons/ios/120.png",revision:"b220b5c8b7b7e7d9a584a2056b2540bb"},{url:"/user/icons/ios/128.png",revision:"7c49227c614fe42537b0167d952ead32"},{url:"/user/icons/ios/144.png",revision:"f51fef1d28eef3cc766330f6d03fa2f5"},{url:"/user/icons/ios/152.png",revision:"ab39c24b0eb2a257878cf9608d3da3f4"},{url:"/user/icons/ios/16.png",revision:"c0d2388e02c03f8bb17ffc1b4bc545cb"},{url:"/user/icons/ios/167.png",revision:"5af133a286fea487b56dabf0f1fcd0d6"},{url:"/user/icons/ios/180.png",revision:"70e5882783522c33cc56540d170caab3"},{url:"/user/icons/ios/192.png",revision:"fb288fcbbb7c9f47f5362e14b0f2f33f"},{url:"/user/icons/ios/20.png",revision:"f0bf2ffaba86321acdcf5a977bec2a7e"},{url:"/user/icons/ios/256.png",revision:"d4347c6a180d948b4aa839a3d763b411"},{url:"/user/icons/ios/29.png",revision:"4662d313940147770a9e13a29a0d5d9c"},{url:"/user/icons/ios/32.png",revision:"d25338343096fa87ce31fcd2ec9eb2be"},{url:"/user/icons/ios/40.png",revision:"d02dcc9d409900b6328e664964e02b6b"},{url:"/user/icons/ios/50.png",revision:"8991da4f59dfcbf3c937addd8eb9b953"},{url:"/user/icons/ios/512.png",revision:"341e12124525c189948cd22a8e9feac8"},{url:"/user/icons/ios/57.png",revision:"3e85672fbac0cedf5907afc42a9e9efe"},{url:"/user/icons/ios/58.png",revision:"2d9fc0796a0838bf135d00aa4077b3f1"},{url:"/user/icons/ios/60.png",revision:"08e1e04a3565b91c300e1e6d68a68975"},{url:"/user/icons/ios/64.png",revision:"b542df0f46fd38e2dcfbc59c8b849647"},{url:"/user/icons/ios/72.png",revision:"b2b449d913d792b5ed8a7b350d0b321e"},{url:"/user/icons/ios/76.png",revision:"50213c294ebea8e14cbb601284bc04bc"},{url:"/user/icons/ios/80.png",revision:"17a977b3300f8756dccc4baab8fd8f06"},{url:"/user/icons/ios/87.png",revision:"6995adb086f03267a1b6c7614ca3bd1c"},{url:"/user/icons/windows11/LargeTile.scale-100.png",revision:"4c003ef9641258b841d114382f3f511c"},{url:"/user/icons/windows11/LargeTile.scale-125.png",revision:"3cbcb03fa370d44112f7e4cff7edb953"},{url:"/user/icons/windows11/LargeTile.scale-150.png",revision:"1ab15c1616b81eacd17ff775261790cb"},{url:"/user/icons/windows11/LargeTile.scale-200.png",revision:"d79013281e2917852295a1e4cd371479"},{url:"/user/icons/windows11/LargeTile.scale-400.png",revision:"c56004b826304b59a4585e8a80d5a344"},{url:"/user/icons/windows11/SmallTile.scale-100.png",revision:"f331bcff588635454c915c7b6358171c"},{url:"/user/icons/windows11/SmallTile.scale-125.png",revision:"93b12754468d9229a9a9cf8121c1c185"},{url:"/user/icons/windows11/SmallTile.scale-150.png",revision:"ab408b64eb67c3b91599c18615f20599"},{url:"/user/icons/windows11/SmallTile.scale-200.png",revision:"c7b480b5a6564a70578bd7be6c538941"},{url:"/user/icons/windows11/SmallTile.scale-400.png",revision:"71fc558aee1634b849d4cfa97ca46a05"},{url:"/user/icons/windows11/SplashScreen.scale-100.png",revision:"cf11379addac0dbf252d25d88bafed1e"},{url:"/user/icons/windows11/SplashScreen.scale-125.png",revision:"49acb02e91b1f775972c13ce7f8a6d1c"},{url:"/user/icons/windows11/SplashScreen.scale-150.png",revision:"2c5d4a6ffc65bbd3deba1b169cca1df4"},{url:"/user/icons/windows11/SplashScreen.scale-200.png",revision:"60b58ff18925452ccb49371effd8a508"},{url:"/user/icons/windows11/SplashScreen.scale-400.png",revision:"984ca38a940e1b82871a3e586db04efd"},{url:"/user/icons/windows11/Square150x150Logo.scale-100.png",revision:"5708e3358a70e1ad2ea3304e69705b82"},{url:"/user/icons/windows11/Square150x150Logo.scale-125.png",revision:"5de75b5632f7682274247cf898422e81"},{url:"/user/icons/windows11/Square150x150Logo.scale-150.png",revision:"458e52a0afb965a4ce8987539dcbf929"},{url:"/user/icons/windows11/Square150x150Logo.scale-200.png",revision:"83fd14f29a45b50fd0bbefd1b8ddaa32"},{url:"/user/icons/windows11/Square150x150Logo.scale-400.png",revision:"148007101910d0d6765f3a774e95804d"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"a9614cd567e674f37c874eef27bdd991"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"137e48de35560925543f30c87773132c"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"78b68b932df28b86c77c8160caa89af6"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"9efeb6f79c0f6c44834e453acca6a378"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"6af0e4a4d438f7066fb8d416f0b37f0f"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"a584ce05f853d9cb547e13f2fb327ca3"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"cb6a21b0c1e80c9d146a02d984b11248"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"7c5463413fe08ee1ceaffa9c7060899e"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"0e7ccace6a4577ef15c26bfb787ec1e6"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"1ae268b07660c9390dd47d0d752b3f99"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"da1e5ec5a6e7e4c0149fedc25185518a"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"7b2e2059e3b54b63ffd8e6e4bc835978"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"ca205f878d89a0bfb3a32a303c8a0c9d"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"782430221a230c102c694f65f52ee868"},{url:"/user/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"4cf37e669429b0da2c17a88d71008a6c"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"a9614cd567e674f37c874eef27bdd991"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"137e48de35560925543f30c87773132c"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"78b68b932df28b86c77c8160caa89af6"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"9efeb6f79c0f6c44834e453acca6a378"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"6af0e4a4d438f7066fb8d416f0b37f0f"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"a584ce05f853d9cb547e13f2fb327ca3"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"cb6a21b0c1e80c9d146a02d984b11248"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"7c5463413fe08ee1ceaffa9c7060899e"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"0e7ccace6a4577ef15c26bfb787ec1e6"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"1ae268b07660c9390dd47d0d752b3f99"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"da1e5ec5a6e7e4c0149fedc25185518a"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"7b2e2059e3b54b63ffd8e6e4bc835978"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"ca205f878d89a0bfb3a32a303c8a0c9d"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"782430221a230c102c694f65f52ee868"},{url:"/user/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"4cf37e669429b0da2c17a88d71008a6c"},{url:"/user/icons/windows11/Square44x44Logo.scale-100.png",revision:"0e7ccace6a4577ef15c26bfb787ec1e6"},{url:"/user/icons/windows11/Square44x44Logo.scale-125.png",revision:"2246d43a31e909baee612832356ac33d"},{url:"/user/icons/windows11/Square44x44Logo.scale-150.png",revision:"5f4c3fd0a20c1ce9966b47629950cbcd"},{url:"/user/icons/windows11/Square44x44Logo.scale-200.png",revision:"dc4db5ee6b9cc6ce3b7464dc5760f552"},{url:"/user/icons/windows11/Square44x44Logo.scale-400.png",revision:"47e7727e3fc078dd99709ae714f4ae2a"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-16.png",revision:"a9614cd567e674f37c874eef27bdd991"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-20.png",revision:"137e48de35560925543f30c87773132c"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-24.png",revision:"78b68b932df28b86c77c8160caa89af6"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-256.png",revision:"9efeb6f79c0f6c44834e453acca6a378"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-30.png",revision:"6af0e4a4d438f7066fb8d416f0b37f0f"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-32.png",revision:"a584ce05f853d9cb547e13f2fb327ca3"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-36.png",revision:"cb6a21b0c1e80c9d146a02d984b11248"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-40.png",revision:"7c5463413fe08ee1ceaffa9c7060899e"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-44.png",revision:"0e7ccace6a4577ef15c26bfb787ec1e6"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-48.png",revision:"1ae268b07660c9390dd47d0d752b3f99"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-60.png",revision:"da1e5ec5a6e7e4c0149fedc25185518a"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-64.png",revision:"7b2e2059e3b54b63ffd8e6e4bc835978"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-72.png",revision:"ca205f878d89a0bfb3a32a303c8a0c9d"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-80.png",revision:"782430221a230c102c694f65f52ee868"},{url:"/user/icons/windows11/Square44x44Logo.targetsize-96.png",revision:"4cf37e669429b0da2c17a88d71008a6c"},{url:"/user/icons/windows11/StoreLogo.scale-100.png",revision:"8991da4f59dfcbf3c937addd8eb9b953"},{url:"/user/icons/windows11/StoreLogo.scale-125.png",revision:"c9b9c5d877ad249bc3487b82dc245058"},{url:"/user/icons/windows11/StoreLogo.scale-150.png",revision:"f70b6781b4bcc5be77e79fd4fd831272"},{url:"/user/icons/windows11/StoreLogo.scale-200.png",revision:"60f35b4a05d267001f56a13d1a2336c9"},{url:"/user/icons/windows11/StoreLogo.scale-400.png",revision:"a31bea1c07c5843cfebcbc963cfeb3ed"},{url:"/user/icons/windows11/Wide310x150Logo.scale-100.png",revision:"4db1c7c2a6619881571a29df91d12114"},{url:"/user/icons/windows11/Wide310x150Logo.scale-125.png",revision:"5f361c4f8e263db3d540d007d1b622b3"},{url:"/user/icons/windows11/Wide310x150Logo.scale-150.png",revision:"71d580a837859cbee41ef07334004751"},{url:"/user/icons/windows11/Wide310x150Logo.scale-200.png",revision:"cf11379addac0dbf252d25d88bafed1e"},{url:"/user/icons/windows11/Wide310x150Logo.scale-400.png",revision:"60b58ff18925452ccb49371effd8a508"},{url:"/user/inmail_icon.svg",revision:"b25a2354da5151263f7362550d15b4b6"},{url:"/user/kb_icon.svg",revision:"837dd9b2add53d90cbaa498d1f62660b"},{url:"/user/law.svg",revision:"9abe62b0eabb39de7ca35d8be0e7b1f0"},{url:"/user/lesson_bullet.svg",revision:"e78e7bd818f54972932819e923143096"},{url:"/user/lesson_card_image.png",revision:"0c2249c599a5909d800f775c1df46b6c"},{url:"/user/lesson_card_image_2.png",revision:"761cd5d97c31811e2ae7b4a2122f78e0"},{url:"/user/lesson_card_image_3.png",revision:"f0ae67f4592ef072bca5a16d8e897afd"},{url:"/user/lesson_card_image_4.png",revision:"d86d258d33751b6d7d8567a14ba67a6e"},{url:"/user/lesson_card_image_5.png",revision:"0de57c15a816d090866d124ce30f4467"},{url:"/user/lesson_card_image_6.png",revision:"bb78c5fc53dc76fa3eef1e5fd88ba344"},{url:"/user/lessons_icon.svg",revision:"a281020bf1238952455e7fd58c44435d"},{url:"/user/likes.png.png",revision:"ae7764ba9e4cf050b732be605bc5f6c2"},{url:"/user/likes.svg",revision:"9adcd220a6636b9122da146f372efb81"},{url:"/user/list_acc.svg",revision:"b06afe3ac9301478714c7f8826675ad4"},{url:"/user/list_bus_std.svg",revision:"2b35c1c31322720a8b8a02faa8363f2d"},{url:"/user/list_economics.svg",revision:"aed69c4e922dc22055b59a5a3853fb8c"},{url:"/user/list_eng_fal.svg",revision:"d33a497f5a85d7ad5717ec2c3684f11e"},{url:"/user/list_eng_hl.svg",revision:"9e815dffb6df05c61119f0b7ef0b0b45"},{url:"/user/list_geo.svg",revision:"ee89f4f246cc99490ce4458004e3828a"},{url:"/user/list_life_science.svg",revision:"39ee528b84190de2144cb061fc62c43b"},{url:"/user/list_math.svg",revision:"1cc93c0ed6548fe11876a99465ff6d6c"},{url:"/user/list_math_lit.svg",revision:"0c34285c71205ae52f2f1ff325eacf55"},{url:"/user/list_physci.svg",revision:"9ba795d0e0c6ec36b6f429e1ca68f8d7"},{url:"/user/list_tourism.svg",revision:"7e47b4918ce22f8a3e6f7d43ac5559b5"},{url:"/user/live_acc.svg",revision:"2bd8d49c436540c1cbddc24ac421fe41"},{url:"/user/live_bus_std.svg",revision:"1d64ec75065d83660481015b77e3c823"},{url:"/user/live_economics.svg",revision:"92946b43f49918f4b260c796b7753563"},{url:"/user/live_eng_fal.svg",revision:"e6f8870de7b813b79f61d8554e6c851a"},{url:"/user/live_eng_hl.svg",revision:"79ce22bab4f3c247fa9ed2fd5e33051b"},{url:"/user/live_geo.svg",revision:"6f549877af529d87a3dc9a495991d404"},{url:"/user/live_life_science.svg",revision:"b6014103be2cc333320ebad7a2f1a511"},{url:"/user/live_math.svg",revision:"a9e405504d7f3b0d3f6d49e18fb246f0"},{url:"/user/live_math_lit.svg",revision:"6691748dcf96ca072f203d91645048e0"},{url:"/user/live_physci.svg",revision:"33a29e65677637373f9c5a8388a6b5da"},{url:"/user/live_tourism.svg",revision:"ed7650e879b9913f9cc22ed9e34009f4"},{url:"/user/loading.gif",revision:"6d1d180a0656f6edc4b236eb2a9fe690"},{url:"/user/loading1.gif",revision:"b509dd342a2626ef3b6963edcc60b11d"},{url:"/user/logo.png",revision:"69ec59a705357eb2f9a786789277cea2"},{url:"/user/manifest.json",revision:"2796fb52b40f846f58982644b4c42917"},{url:"/user/medHealthSci.svg",revision:"442d357fb783f4b43fe5f7630177352c"},{url:"/user/message-circle.svg",revision:"ebbe6d9aff08b5bab2e86f719d8ae329"},{url:"/user/milSci.svg",revision:"588aa734f4f6cb96956173c0a6456e0d"},{url:"/user/modal_attachment.svg",revision:"f650916bf3a9e4d761823fc127dc4382"},{url:"/user/modal_attachment_white.svg",revision:"ab3580ca1e6be645b6e50a7adecaed52"},{url:"/user/modal_close.svg",revision:"162f0e2fdc5b995a5af66e0b0dc6180d"},{url:"/user/modal_close_topic.svg",revision:"5395abb83d7c81b2df48b5a055eba38f"},{url:"/user/nav_bell.svg",revision:"7221b44f2aeec9914c10034c09bb3718"},{url:"/user/nav_events.svg",revision:"dc4146909239c8a15eba89b0af6d5027"},{url:"/user/nav_options.svg",revision:"9cff9ea230e997356d33cf605604c508"},{url:"/user/nav_support.svg",revision:"483af3e3c7fd877236233a552a900396"},{url:"/user/next_arrow.svg",revision:"0dbc7377b47b18147f8591e7686fb85b"},{url:"/user/notes_icon.svg",revision:"a281020bf1238952455e7fd58c44435d"},{url:"/user/onesignal/OneSignalSDKWorker.js",revision:"7ff0485cee1f7099162a18fe12b8b8a3"},{url:"/user/page404.png",revision:"fa836906f14cc88653c92120c804f75f"},{url:"/user/page500.png",revision:"55ae87c7d35024ea18a733856c353566"},{url:"/user/previous_arrow.svg",revision:"30e0568f87169ebd7e57c44b18d7fbec"},{url:"/user/profile.jpg",revision:"bad3abe0037cde30f0ca5f699b6497fa"},{url:"/user/profile.png",revision:"7b65ea668cc7f2cdf077e65a9af403b9"},{url:"/user/profile_icon.svg",revision:"e7b9ec93395a8141ec86442a76934d0b"},{url:"/user/radioDot.svg",revision:"83706b6c58d274b8b4d85d76985262dd"},{url:"/user/red_dot.svg",revision:"a1ccfbfdd450fce2cdc26ce8e2c52de5"},{url:"/user/safari-pinned-tab.svg",revision:"0f3c6a038376ecba60bb68ec20c7a137"},{url:"/user/science.svg",revision:"21e3f7b9d50ac8e527ea4f8aebcfbda9"},{url:"/user/search_icon.svg",revision:"16fd9a8ff21367430fb638b1e180845c"},{url:"/user/share-2.svg",revision:"7c7332c0ed554eab2cf1da1467260983"},{url:"/user/stats_avgquiz.svg",revision:"05452e5ad01c4069e0ffbdd18e0fb2d9"},{url:"/user/stats_completed.svg",revision:"34edb44c36feaa46d6499b5c7b388199"},{url:"/user/stats_hours.svg",revision:"480455e03d993c79cdd82770c41c650a"},{url:"/user/stats_inprogress.svg",revision:"916c3c68c775425d3dff2ba54500ab9e"},{url:"/user/suncep_book_logo.svg",revision:"328d9df2ccaac064698827798d3de73c"},{url:"/user/suncep_book_logo_yellow.svg",revision:"7feea93b0020d7eab8e75c36918e5534"},{url:"/user/suncep_helpful.svg",revision:"8d2ccfc2d986fd632c97ba705906339f"},{url:"/user/suncep_lesson.svg",revision:"8e1bacf88555cf05a8b24ef2a683f340"},{url:"/user/suncep_lesson_white.svg",revision:"03fa0d26dbe6db5630b8df5ec6eeaa83"},{url:"/user/suncep_logo.svg",revision:"4d9faecf7d91a91d4767e43d39874380"},{url:"/user/suncep_materials.svg",revision:"13e1fe7d7c3db2ad63427246d851c47b"},{url:"/user/suncep_notes.svg",revision:"37d15bd26ea835df6db8b833e9223dda"},{url:"/user/suncep_reply.svg",revision:"c4de2a212c4ace6f7da0e350d1e0c977"},{url:"/user/sup_log_icon.svg",revision:"9fc7d472a1065c7aaec7b39f7e534707"},{url:"/user/sup_notes_icon.svg",revision:"192b8b50393cdb656fcd8830c8c797a0"},{url:"/user/sup_notify_icon.svg",revision:"eed860bdc3b8e543353a77cf01cff3b0"},{url:"/user/sup_tickets_icon.svg",revision:"f3f451ad8497841ae17a9c52fcb6acf9"},{url:"/user/theology.svg",revision:"748063ed65e711f1d563d3a2819ea02d"},{url:"/user/thumbs-up.svg",revision:"9c8c68382aa7a78b083e7fa7a4675e06"},{url:"/user/user_bio.svg",revision:"b1f04c1d9ce0716cb071c281614e891f"},{url:"/user/user_device.svg",revision:"9989612f299a26b1f4d9d098ef6e1652"},{url:"/user/user_event.png",revision:"87585e403e1383cb9e22432fd93bff8c"},{url:"/user/user_event2.png",revision:"b5fbb85c65c3138668741c74cc22f79d"},{url:"/user/user_event3.png",revision:"d9e2668b19664c5d0bb3df14fc8c2323"},{url:"/user/user_event4.png",revision:"bce64e9a7c17134272b66b99482ab022"},{url:"/user/user_grade.svg",revision:"d8a6c44e512df538b4b8f528811461a1"},{url:"/user/user_kin.svg",revision:"33d4364149d9edf3a0d4043a5b47d5f8"},{url:"/user/user_place.svg",revision:"f3a8dfd530fddc923797b803b026a572"},{url:"/user/user_school.svg",revision:"d38369b0338d288fd98f30442e6ecd1c"},{url:"/user/welcome-img.png",revision:"742bb3de463c59315e23cdb8fab22242"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/user",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>self.origin===e.origin&&!(!e.pathname.startsWith("/_next/data/")||-1===e.pathname.indexOf(".json"))),new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{cacheWillUpdate:async({request:e,response:s})=>e.headers.get("x-middleware-prefetch")||s.headers.get("x-middleware-skip")?null:200===s.status?s:null},{cachedResponseWillBeUsed:async({cacheName:e,request:s,matchOptions:i,cachedResponse:r,event:a})=>r&&r.headers.get("x-middleware-skip")?null:r}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/callback/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));