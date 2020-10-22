'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">FunESport</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' : 'data-target="#xs-controllers-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' :
                                            'id="xs-controllers-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MyFavoritesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyFavoritesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MySportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MySportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' : 'data-target="#xs-injectables-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' :
                                        'id="xs-injectables-links-module-AppModule-70963511b4ff18c833e6b84373d96baf"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' : 'data-target="#xs-controllers-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' :
                                            'id="xs-controllers-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' : 'data-target="#xs-injectables-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' :
                                        'id="xs-injectables-links-module-AuthModule-3ba0994ebad191de69f5413fa0e4cc99"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentariesModule.html" data-type="entity-link">CommentariesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' : 'data-target="#xs-controllers-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' :
                                            'id="xs-controllers-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' }>
                                            <li class="link">
                                                <a href="controllers/CommentariesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentariesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' : 'data-target="#xs-injectables-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' :
                                        'id="xs-injectables-links-module-CommentariesModule-bf8b06beb68ae6df65f9084fec27ac68"' }>
                                        <li class="link">
                                            <a href="injectables/CommentariesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommentariesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyFavoritesModule.html" data-type="entity-link">MyFavoritesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' : 'data-target="#xs-controllers-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' :
                                            'id="xs-controllers-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' }>
                                            <li class="link">
                                                <a href="controllers/MyFavoritesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyFavoritesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' : 'data-target="#xs-injectables-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' :
                                        'id="xs-injectables-links-module-MyFavoritesModule-9ac9d5461f650da2818a4ebbe4f9dc04"' }>
                                        <li class="link">
                                            <a href="injectables/MyFavoritesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MyFavoritesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MySportsModule.html" data-type="entity-link">MySportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' : 'data-target="#xs-controllers-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' :
                                            'id="xs-controllers-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' }>
                                            <li class="link">
                                                <a href="controllers/MySportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MySportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' : 'data-target="#xs-injectables-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' :
                                        'id="xs-injectables-links-module-MySportsModule-89054f9665c24cd87d4af5fb2cb53492"' }>
                                        <li class="link">
                                            <a href="injectables/MySportsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MySportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link">NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' : 'data-target="#xs-controllers-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' :
                                            'id="xs-controllers-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' }>
                                            <li class="link">
                                                <a href="controllers/NewsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' : 'data-target="#xs-injectables-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' :
                                        'id="xs-injectables-links-module-NewsModule-ac557ebf10a5484d9e3549c5ef449788"' }>
                                        <li class="link">
                                            <a href="injectables/NewsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PronosticsModule.html" data-type="entity-link">PronosticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' : 'data-target="#xs-controllers-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' :
                                            'id="xs-controllers-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' }>
                                            <li class="link">
                                                <a href="controllers/PronosticsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PronosticsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' : 'data-target="#xs-injectables-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' :
                                        'id="xs-injectables-links-module-PronosticsModule-a5e647ae70d5721d13b21ae387281f29"' }>
                                        <li class="link">
                                            <a href="injectables/PronosticsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PronosticsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SportsModule.html" data-type="entity-link">SportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' : 'data-target="#xs-controllers-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' :
                                            'id="xs-controllers-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' }>
                                            <li class="link">
                                                <a href="controllers/SportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' : 'data-target="#xs-injectables-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' :
                                        'id="xs-injectables-links-module-SportsModule-912744ed30fd7c7e74b11b89023d5824"' }>
                                        <li class="link">
                                            <a href="injectables/SportsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' : 'data-target="#xs-controllers-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' :
                                            'id="xs-controllers-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' : 'data-target="#xs-injectables-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' :
                                        'id="xs-injectables-links-module-UsersModule-3efa8158d04abdb3fd51afe3556df9f9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Commentary.html" data-type="entity-link">Commentary</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentaryDto.html" data-type="entity-link">CreateCommentaryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMyFavoriteDto.html" data-type="entity-link">CreateMyFavoriteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMySportDto.html" data-type="entity-link">CreateMySportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNewsDto.html" data-type="entity-link">CreateNewsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePronosticDto.html" data-type="entity-link">CreatePronosticDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSportDto.html" data-type="entity-link">CreateSportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyFavorite.html" data-type="entity-link">MyFavorite</a>
                            </li>
                            <li class="link">
                                <a href="classes/MySport.html" data-type="entity-link">MySport</a>
                            </li>
                            <li class="link">
                                <a href="classes/News.html" data-type="entity-link">News</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pronostic.html" data-type="entity-link">Pronostic</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sport.html" data-type="entity-link">Sport</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});