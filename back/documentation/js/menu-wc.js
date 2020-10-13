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
                                            'data-target="#controllers-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' : 'data-target="#xs-controllers-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' :
                                            'id="xs-controllers-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' }>
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
                                        'data-target="#injectables-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' : 'data-target="#xs-injectables-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' :
                                        'id="xs-injectables-links-module-AppModule-81b0f79b105a8167b1fe0074806d6949"' }>
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
                                <a href="modules/MyFavoritesModule.html" data-type="entity-link">MyFavoritesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' : 'data-target="#xs-controllers-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' :
                                            'id="xs-controllers-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' }>
                                            <li class="link">
                                                <a href="controllers/MyFavoritesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyFavoritesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' : 'data-target="#xs-injectables-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' :
                                        'id="xs-injectables-links-module-MyFavoritesModule-a5c66d48b16a4943ad0ecc6592f6c996"' }>
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
                                            'data-target="#controllers-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' : 'data-target="#xs-controllers-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' :
                                            'id="xs-controllers-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' }>
                                            <li class="link">
                                                <a href="controllers/MySportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MySportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' : 'data-target="#xs-injectables-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' :
                                        'id="xs-injectables-links-module-MySportsModule-b7940ae86498a92e512c9ccc64d669cd"' }>
                                        <li class="link">
                                            <a href="injectables/MySportsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MySportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PronosticsModule.html" data-type="entity-link">PronosticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' : 'data-target="#xs-controllers-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' :
                                            'id="xs-controllers-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' }>
                                            <li class="link">
                                                <a href="controllers/PronosticsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PronosticsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' : 'data-target="#xs-injectables-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' :
                                        'id="xs-injectables-links-module-PronosticsModule-cfc3fd9d7c5cff59ba4b6c73bf10861f"' }>
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
                                            'data-target="#controllers-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' : 'data-target="#xs-controllers-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' :
                                            'id="xs-controllers-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' }>
                                            <li class="link">
                                                <a href="controllers/SportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' : 'data-target="#xs-injectables-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' :
                                        'id="xs-injectables-links-module-SportsModule-deb71bec9c8be33abb68ed0ce4c9f38d"' }>
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
                                            'data-target="#controllers-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' : 'data-target="#xs-controllers-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' :
                                            'id="xs-controllers-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' : 'data-target="#xs-injectables-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' :
                                        'id="xs-injectables-links-module-UsersModule-8affea11638c80e9228adc0f45ede624"' }>
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
                                <a href="classes/CreateMyFavoriteDto.html" data-type="entity-link">CreateMyFavoriteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMySportDto.html" data-type="entity-link">CreateMySportDto</a>
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