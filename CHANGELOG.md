#### 0.5.2 (2019-09-16)

##### Chores

* **build:**  bundle library for v0.5.2 ([dd0232e3](https://github.com/anzalab/majifix-analytics/commit/dd0232e397601177bd439497e38dc1d487999157))
* **package:**  update package version to 0.5.2 ([1dc9a346](https://github.com/anzalab/majifix-analytics/commit/1dc9a3461ab2f91c14d975824f503e1c013023d0))

##### Refactors

* **facets:**  change unattended to unconfirmed ([a5c8d23b](https://github.com/anzalab/majifix-analytics/commit/a5c8d23b727cc960dcd3f5bb6e2c435247f4fdf7))

#### 0.5.1 (2019-09-16)

##### Chores

* **build:**  bundle library v0.5.1 ([eba4c5ad](https://github.com/anzalab/majifix-analytics/commit/eba4c5adaf6ed56307ffd18b6e4702e7c74b6177))
* **package:**  update package version to 0.5.1 ([f4d47aed](https://github.com/anzalab/majifix-analytics/commit/f4d47aedec2a064be211ceb76932de7f7874bdbe))

##### Refactors

*  rename reporting methods to reporting channel facet ([f2582440](https://github.com/anzalab/majifix-analytics/commit/f25824409ff26175aa7d7eb9cf038c285efaeb3f))

#### 0.5.0 (2019-09-13)

##### Chores

* **deps:**
  *  update dependencies to latest versions ([21dde86b](https://github.com/anzalab/majifix-analytics/commit/21dde86bf1980e4268148b7b2e4349d0a3b61666))
  *  update dependencies to latest versions ([ddc8d069](https://github.com/anzalab/majifix-analytics/commit/ddc8d069c2c4bc33275c3c0072b284ce2b223019))
  *  fix security vulnerability ([1e24d43a](https://github.com/anzalab/majifix-analytics/commit/1e24d43abfcb339feb639604ae787f7b45c3ebb9))
* **package:**  update package version to 0.5.0 ([dd3bc727](https://github.com/anzalab/majifix-analytics/commit/dd3bc727c2d2f4f7d83f3b9d7532fbfe8586695a))
* **build:**
  *  bundle library for testing ([ea7374bb](https://github.com/anzalab/majifix-analytics/commit/ea7374bb3b819e8f67b477d957d147e5aa1509e7))
  *  bundle library for testing ([c9fcafe7](https://github.com/anzalab/majifix-analytics/commit/c9fcafe75500b9b6ba22fc3251f72e98acf56cfd))
  *  bundle library for testing ([1c32fbfd](https://github.com/anzalab/majifix-analytics/commit/1c32fbfd4cd131cfc3535cb28de144476b478e03))
  *  bundle library for testing ([966553f5](https://github.com/anzalab/majifix-analytics/commit/966553f53f2aaa1f17394952c594dd845a21b1e2))

##### New Features

*  add metric times for overview facets ([4e33ac62](https://github.com/anzalab/majifix-analytics/commit/4e33ac629a34f2e025aa7c4301f12ea8687b7812))
*  normalize times to have max, min and average on overall results ([8e7abbb9](https://github.com/anzalab/majifix-analytics/commit/8e7abbb9a34f3b001ac72a0ca5873b2086fdee8f))
*  add times in overviews report ([29ba176a](https://github.com/anzalab/majifix-analytics/commit/29ba176a531830c64d234900fd5dc41156e6488e))
*  add facet for time calculation ([6c69bef0](https://github.com/anzalab/majifix-analytics/commit/6c69bef03c42bc5fb466945764d5f1e787354815))
*  add late time calculation logic ([f620d5de](https://github.com/anzalab/majifix-analytics/commit/f620d5de194bc84b08421c957f956ab3357718a9))
*  add initial time calculations for base service request ([08692695](https://github.com/anzalab/majifix-analytics/commit/08692695afaa20dd4e8bef049a8a88cc8263175d))
*  add more flags in service request base aggregation ([b1548cde](https://github.com/anzalab/majifix-analytics/commit/b1548cdeb961468f60d68641e4c78419dc103ff6))
*  add zone facet ([161249a2](https://github.com/anzalab/majifix-analytics/commit/161249a27d5c7c55d09ab555ed97ab978ce77f6f))
* **service request:**  add late flag ([9ce79d17](https://github.com/anzalab/majifix-analytics/commit/9ce79d17dd70a12491044b5ec3a941ae3e69545f))
* **reports:**  add operational report(wip) ([a0fff9ff](https://github.com/anzalab/majifix-analytics/commit/a0fff9ff493f4b5746b3707e36e772327c26f2c0))

##### Bug Fixes

*  normalize service type metric times ([361f902d](https://github.com/anzalab/majifix-analytics/commit/361f902ddf90fa28ce951f9444e73a98750fa1c8))

##### Performance Improvements

*  conclude there is no performance gain on parallel facets ([4e98ed3f](https://github.com/anzalab/majifix-analytics/commit/4e98ed3ffbd2951d0b83347f96f62e81d232cb70))
* **wip:**
  *  fix a bug on overview report method ([306959f4](https://github.com/anzalab/majifix-analytics/commit/306959f4d40a130d5418033e8de67f91b2c95b09))
  *  test facet based on number of cores ([6ac41fc2](https://github.com/anzalab/majifix-analytics/commit/6ac41fc26d77640bc8e64b77b2cd3b249bedfa21))
  *  parallelize facets in overviews report ([57a0369c](https://github.com/anzalab/majifix-analytics/commit/57a0369c37621a4c5316c596e74c8aa21ba1cc9e))

##### Refactors

*  expose analyticRouter instead of router ([eecd42fd](https://github.com/anzalab/majifix-analytics/commit/eecd42fd2c7b5864f74796c876605524ebd1c07f))
*  remove time facet and add metric times in overall facet ([ce1e7f87](https://github.com/anzalab/majifix-analytics/commit/ce1e7f8771fcf9fe3cc2bbafe6edec7b6e759434))
*  remove status facet from operator report ([32ba4a95](https://github.com/anzalab/majifix-analytics/commit/32ba4a9573adaabbcdae050562f92b7739b32afc))

##### Code Style Changes

*  format files after install deps ([e5230cc0](https://github.com/anzalab/majifix-analytics/commit/e5230cc09250432f71ef46688a8ee1c5e595eb04))

#### 0.4.3 (2019-08-22)

##### Chores

* **build:**  bundle library for v0.4.3 release ([8c4274be](https://github.com/anzalab/majifix-analytics/commit/8c4274be4459d43eee08ec3055fc5358a9c606fe))
* **package:**  update package version to v0.4.3 ([c9cd82a7](https://github.com/anzalab/majifix-analytics/commit/c9cd82a745e8c144acebe8f54dc858794f2e8b32))

##### Documentation Changes

* **jsdoc:**  improve facets documentation ([e9c0eb21](https://github.com/anzalab/majifix-analytics/commit/e9c0eb213d2ac1d21ddc669c4a7fa309279c7c5c))

##### New Features

*  add changelog base aggregation ([5770fb69](https://github.com/anzalab/majifix-analytics/commit/5770fb694514cd0c5767ac1a93041875e2c5b316))
*  add statuses per service breakdown in operator report ([ff1e6ebe](https://github.com/anzalab/majifix-analytics/commit/ff1e6ebe68ddb4d3d9e30a8e1e0d58acdcdcc224))

##### Bug Fixes

*  use $assignee variable instead of $operator in assignee facet ([2705825a](https://github.com/anzalab/majifix-analytics/commit/2705825a32ba6842df9704ef4c8704d2518fcd97))

##### Refactors

*  restore service facet in operator report ([bca0db1f](https://github.com/anzalab/majifix-analytics/commit/bca0db1fd4ff5c73d28fcd6b2fbd60cf8c5b81a0))

#### 0.4.2 (2019-08-19)

##### Chores

* **build:**  bundle library for v0.4.2 release ([04925990](https://github.com/anzalab/majifix-analytics/commit/0492599076a7c2d8e57924db0bd2679a4c7a420b))
* **package:**  update package version to v0.4.2 ([3a209407](https://github.com/anzalab/majifix-analytics/commit/3a209407eda319c03d955aff71d8bda013a6f480))

##### Refactors

*  change status to statuses for status facet ([5e6cdb53](https://github.com/anzalab/majifix-analytics/commit/5e6cdb535ff896fd9924e018b5e4e1f8a969a2cf))

#### 0.4.1 (2019-08-19)

##### Chores

* **build:**  bundle library for v0.4.1 release ([b50c2265](https://github.com/anzalab/majifix-analytics/commit/b50c2265a6fb75cd3b15775339c88df58dbffee5))
* **package:**  update package version to v0.4.1 ([bc63e083](https://github.com/anzalab/majifix-analytics/commit/bc63e083225716e80d0c60fae53b315f4206c869))

##### Refactors

*  use mquery params only for filtering ([c3996e5c](https://github.com/anzalab/majifix-analytics/commit/c3996e5c349a151d8760192dbcec98003ab1bf8f))
*  change endpoints to use plural names ([66ec6b0b](https://github.com/anzalab/majifix-analytics/commit/66ec6b0b35ad015cd4dd609f15eed6fab5034260))

#### 0.4.0 (2019-08-19)

##### Chores

* **build:**  bundle library for v0.4.0 release ([611be599](https://github.com/anzalab/majifix-analytics/commit/611be599e47b1745ddf4d0f79ee673ca8c130aaa))
* **package:**  update package version to v0.4.0 ([17ef74b1](https://github.com/anzalab/majifix-analytics/commit/17ef74b14d84778403d6254e6827458b14cbdcc2))

##### New Features

*  add late count in service type facet ([a6af40fb](https://github.com/anzalab/majifix-analytics/commit/a6af40fb62ef0c0c48434cf414139fca02133ab7))

#### 0.3.1 (2019-08-19)

##### Chores

* **build:**  bundle library for v0.3.1 release ([fa8d72a5](https://github.com/anzalab/majifix-analytics/commit/fa8d72a508f7d2b61bf188774adeb7d840747915))
* **package:**  update package version to v0.3.1 ([9eb874a5](https://github.com/anzalab/majifix-analytics/commit/9eb874a5ac67f966db7b4b80b3035fc07c8192fb))

##### Bug Fixes

*  a bug on checking normalizeTime method input ([045e9a85](https://github.com/anzalab/majifix-analytics/commit/045e9a85fb1e3d45d9548f77194d326479385770))
*  prevent app crash when averageTime is not a number ([263d13ea](https://github.com/anzalab/majifix-analytics/commit/263d13eaf7b5eee5a20b2a066ab349cfb42c8bef))

##### Code Style Changes

*  use object destructuring for lodash dependency import ([68c15ee2](https://github.com/anzalab/majifix-analytics/commit/68c15ee2a069f021618851a1b415a5037118d9f9))

#### 0.3.0 (2019-08-19)

##### Chores

* **build:**  bundle library for v0.3.0 release ([a0498a58](https://github.com/anzalab/majifix-analytics/commit/a0498a580f989ea8e988ca0815e4b96602d86074))
* **package:**  update package version to v0.3.0 ([0f095bf0](https://github.com/anzalab/majifix-analytics/commit/0f095bf009f1f564c9a60fdd637a64c60225b509))

##### New Features

*  add late count in overall facet ([cf90e745](https://github.com/anzalab/majifix-analytics/commit/cf90e745d241c9816ec07d4487bee1f735c30c2a))
*  parse average times to human readable format ([e200149b](https://github.com/anzalab/majifix-analytics/commit/e200149bab999267f6a40807ec8962fff69a10a8))

##### Refactors

*  remove unnessesary util functions ([b066a3c2](https://github.com/anzalab/majifix-analytics/commit/b066a3c2545f6a6656795720ac8e250904d56d9f))

#### 0.2.0 (2019-08-16)

##### Chores

* **build:**  bundle library for v0.2.0 release ([07297982](https://github.com/anzalab/majifix-analytics/commit/07297982f958d880cd38675f33212d64b26e2739))
* **package:**  update package version to v0.2.0 ([731c698e](https://github.com/anzalab/majifix-analytics/commit/731c698e836b09156814c6bc1ea82cd9b0f8aa35))

##### New Features

*  add resolved and pending in workspace and method report ([733bb373](https://github.com/anzalab/majifix-analytics/commit/733bb373bddccce558844ad7b0f811d5a6e4ffce))

#### 0.1.1 (2019-08-15)

##### Chores

* **package:**  update package version to v0.1.1 ([45249ae6](https://github.com/anzalab/majifix-analytics/commit/45249ae656ed4c70d53fa7181124664e742e71f8))
* **package.json:**  point urls to the right repository ([d7f76b90](https://github.com/anzalab/majifix-analytics/commit/d7f76b9064b2de4da75cc883c22a1d22ac90cfdf))

##### Documentation Changes

* **changelog:**  remove previous changelogs for iso-lib ([a88beaac](https://github.com/anzalab/majifix-analytics/commit/a88beaacd675708cf60507ba51c111474018e20c))

#### 0.1.0 (2019-08-15)

##### Chores

* **build:**
  *  bundle library for v0.1.0 release ([149755cd](https://github.com/lykmapipo/iso-lib-starter/commit/149755cd628b7bcb8e11f7cfae84ea036d81f6f4))
  *  bundle library for testing ([f9e3f926](https://github.com/lykmapipo/iso-lib-starter/commit/f9e3f92635fbbb8a5d4dd19b22d046051b808c83))
  *  bundle library for testing ([0307fc31](https://github.com/lykmapipo/iso-lib-starter/commit/0307fc3173460b5d8b2fc0ac0bea25651af391e7))
  *  bundle library for testing ([46a54967](https://github.com/lykmapipo/iso-lib-starter/commit/46a54967d5958d6fc8ee2205a9f1486957b5fb91))
  *  bundle library for testing ([577dc925](https://github.com/lykmapipo/iso-lib-starter/commit/577dc925fd17e0dcc4ad3156707ebab71f9214c8))
  *  bundle library for testing ([775f511c](https://github.com/lykmapipo/iso-lib-starter/commit/775f511cf212a23faedc166b1edf3cacc923d184))
* **package.json:**
  *  update package name ([d083645b](https://github.com/lykmapipo/iso-lib-starter/commit/d083645b98cc8469e57c4ab7d4381d695f4d646e))
  *  update package name and description ([8137b7fa](https://github.com/lykmapipo/iso-lib-starter/commit/8137b7fa52d24a8bed2d140f164757068d8eb39c))
*  track aggregations dir on git ([3f4ab000](https://github.com/lykmapipo/iso-lib-starter/commit/3f4ab0000e6f2580eb4e43b8c00446d445e38af5))
*  remove no longer needed .gitkeep file ([542e939b](https://github.com/lykmapipo/iso-lib-starter/commit/542e939bd15a0aca1f3fdc4057e2217a7853774e))
*  initial version for testing in open311 legacy api ([16151a99](https://github.com/lykmapipo/iso-lib-starter/commit/16151a99047156f1f7cf749ed35465d197ab25eb))
*  ignore vscode and neovim config files ([53018d65](https://github.com/lykmapipo/iso-lib-starter/commit/53018d652d0d11095a9939d856c7717fec79454c))
*  initialize repo ([2c2a18e3](https://github.com/lykmapipo/iso-lib-starter/commit/2c2a18e39212c4d6b7fbce325adadd1ddf2c872a))
* **deps:**  update dependencies to latest versions ([3f797372](https://github.com/lykmapipo/iso-lib-starter/commit/3f797372d1fcb68403d16c2aa6839796312ec941))

##### Documentation Changes

* **readme:**
  *  update usage instructions ([b6da446a](https://github.com/lykmapipo/iso-lib-starter/commit/b6da446a4bc7b831f87ba3ed3181885c6a94a101))
  *  update docs and remove isolib docs ([3b62cdda](https://github.com/lykmapipo/iso-lib-starter/commit/3b62cddac1498caccecfd671f0a295d2db2ae472))
* **router:**  add initial api docs for routes ([ef1e03b5](https://github.com/lykmapipo/iso-lib-starter/commit/ef1e03b52bcbf5b266dc0c7f657e70e0d50c1c70))
*  update jsdoc ([3a04aca6](https://github.com/lykmapipo/iso-lib-starter/commit/3a04aca64c4e6d98724f835cf80fa9325fa7b1f0))

##### New Features

*  sort leadersboard by total count ([ee807ab8](https://github.com/lykmapipo/iso-lib-starter/commit/ee807ab86af9b6cc3539bab63e0c1d4155108b27))
*  add leadersboard facet in operator report ([59f6024e](https://github.com/lykmapipo/iso-lib-starter/commit/59f6024e351b788eb21bec8c651a60dabcfd5d7b))
*  allow passing jurisdiction id in performance url ([9c67db35](https://github.com/lykmapipo/iso-lib-starter/commit/9c67db350fd320e8b991da951a8fee684e454fd8))
*  add initial operator report ([d2d8ec42](https://github.com/lykmapipo/iso-lib-starter/commit/d2d8ec42ee5c3ccbf36870793adc53648e5e6b57))
*  add performance report ([60ec5b63](https://github.com/lykmapipo/iso-lib-starter/commit/60ec5b6347024e19906bc6de98d26bf38ac43178))
*  extract aggregation criteria from request ([90030f76](https://github.com/lykmapipo/iso-lib-starter/commit/90030f76416c060a015966d7a8e7f819a3f104d6))

##### Bug Fixes

*  return multilingual name for service ([87d8170b](https://github.com/lykmapipo/iso-lib-starter/commit/87d8170b4fbecdc5dff2635c7cf24240714784ed))
*  ensure pending, resolved and unattended calculation are correct ([79814ca9](https://github.com/lykmapipo/iso-lib-starter/commit/79814ca92f9c6005f945434304ff88b047bd376e))

##### Refactors

*  format response to have appropriate structure ([a5bec693](https://github.com/lykmapipo/iso-lib-starter/commit/a5bec693abd2cf22266742d2740d06c482661c7e))
*  move leadersboard facet from operator to overview report ([b4382753](https://github.com/lykmapipo/iso-lib-starter/commit/b438275356f13e1d2e483f615a90b1bcdf42a01b))
*  extract all facets to a single file ([89c46298](https://github.com/lykmapipo/iso-lib-starter/commit/89c4629818485cec0505281a7a666fae1190a3f3))
*  move addFields operator to service request base aggregration ([512f20c5](https://github.com/lykmapipo/iso-lib-starter/commit/512f20c52593a3e7cba0df4352c926d5a6ec3388))

##### Code Style Changes

*  fix typos on jsdoc ([b7ab6426](https://github.com/lykmapipo/iso-lib-starter/commit/b7ab642688efad3b54044f6e7364cae8cf093ea1))
