import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app/app-config';
import { environment } from 'src/environments/environment';
import { ServiceBase } from './../../helpers/mixins/service-base';
import { TypingName, TypingProperty, TypingSEO } from './meta-management.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MetaManagementService extends ServiceBase implements OnDestroy {

  baseUrl: string = environment.appUrl;
  //defaultMeta: TypingSEO = <TypingSEO>AppConfig.meta.default;

  private currentMetaSubject = new BehaviorSubject<TypingSEO>(<TypingSEO>AppConfig.meta.default);

  get meta(): Meta {
    return this.ngMeta;
  }

  constructor(
    private ngMeta: Meta,
    private ngTitle: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
    this.recordSubscription(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(event => this.onRouterChange())
    );
  }


  getUpdateStatus() {
    return this.currentMetaSubject.asObservable();
  }

  onRouterChange() {
    let newRouteMeta = this.getRouteMeta();
    newRouteMeta.url = this.router.url;
    this.setTags(newRouteMeta);
    this.currentMetaSubject.next(newRouteMeta);
  }

  getRouteMeta() {
    let route: ActivatedRoute | undefined = this.route;
    let metaData;
    while (route) {
      if (route?.snapshot?.data['meta']) {
        metaData = route.snapshot.data['meta'];
        break;
      }
      route = route.firstChild ?? undefined;
    }
    return Object.assign(Object.assign({}, <TypingSEO>AppConfig.meta.default), metaData);
  }

  /**
   * @description Set General SEO Tags
   * @param config: TypingSEO
   * @return void
   */
  setTags(config: TypingSEO): void {
    if (config.title !== undefined || config.titleSuffix !== undefined) {
      this.title(config.title ?? AppConfig.meta.default.title, config.titleSuffix ?? AppConfig.meta.default.titleSuffix);
    }
    if (config.description !== undefined) {
      this.description(config.description);
    }
    if (config.image !== undefined) {
      this.image(config.image);
    }
    if (config.keywords !== undefined) {
      this.keywords(config.keywords);
    }
    if (config.url !== undefined) {
      this.url(config.url);
    }
  }

  /**
   * @description Set Name Tag
   * @param name: TypingName
   * @param content
   * @return void
   */
  setNameTag(name: TypingName): void {
    const property: any = {
      name: name.name,
      content: name.content,
    };
    if (name.itemprop !== undefined && name.itemprop !== '') {
      property['itemprop'] = name.itemprop;
    }
    if (this.meta.getTag(`name="${property.name}"`)) {
      this.meta.updateTag(property);
    } else {
      this.meta.addTag(property);
    }
  }

  /**
   * @description Set Name Tags
   * @param names: [TypingName]
   * @return void
   */
  setNameTags(names: [TypingName]): void {
    names.forEach(prop => {
      this.setNameTag(prop);
    });
  }

  /**
   * @description Set Property Tag
   * @param prop: TypingProperty
   * @param content
   * @return void
   */
  setPropertyTag(prop: TypingProperty): void {
    const property: any = {
      property: prop.property,
      content: prop.content,
    };
    if (prop.itemprop !== undefined && prop.itemprop !== '') {
      property['itemprop'] = prop.itemprop;
    }
    if (this.meta.getTag(`property="${property.property}"`)) {
      this.meta.updateTag(property);
    } else {
      this.meta.addTag(property);
    }
  }

  /**
   * @description Set Property Tags
   * @param props: [TypingProperty]
   * @return void
   */
  setPropertyTags(props: [TypingProperty]): void {
    props.forEach(prop => {
      this.setPropertyTag(prop);
    });
  }

  /**
   * @description Set URL Tag
   * @param content: string
   * @return void
   */
  url(content: string): void {
    this.meta.updateTag({ property: 'og:url', itemprop: 'url', content: `${this.baseUrl}${content}` });
  }

  /**
   * @description Set Title Tag
   * @param title: string
   * @param titleSuffix: string
   * @return void
   */
  title(title?: string, titleSuffix?: string): void {
    if (title === undefined) title = this.currentMetaSubject.value.title ?? AppConfig.meta.default.title;
    const setTitle = (titleSuffix !== undefined && titleSuffix !== '') ? `${titleSuffix} | ${title}` : title;
    this.ngTitle.setTitle(setTitle);
    this.setPropertyTag({ property: 'og:title', itemprop: 'title', content: setTitle });
    this.setPropertyTag({ property: 'twitter:title', itemprop: 'title', content: setTitle });
  }

  /**
   * @description Set Description Tag
   * @param content: string
   * @return void
   */
  description(content: string): void {
    this.setNameTag({ name: 'description', itemprop: 'description', content: content });
    this.setPropertyTag({ property: 'og:description', itemprop: 'description', content: content });
    this.setPropertyTag({ property: 'twitter:description', itemprop: 'description', content: content });
  }

  /**
   * @description Set Image Tag
   * @param content: string
   * @return void
   */
  image(content: string): void {
    this.setPropertyTag({ property: 'twitter:image', itemprop: 'image', content: content });
    this.setPropertyTag({ property: 'og:image', itemprop: 'image', content: content });
    this.setPropertyTag({ property: 'og:image:secure_url', itemprop: 'image', content: content });
  }

  /**
   * @description Set Keywords Tag
   * @param content: string
   * @return void
   */
  keywords(content: string): void {
    this.setNameTag({ name: 'keywords', itemprop: 'keywords', content: content });
  }

  keywordsFromContent(...contents: string[]) {
    let keywords: string[] = AppConfig.meta.default.keywords.split(',');
    contents.forEach(content => {
      content.split(' ').map((word) => !keywords.includes(word) && keywords.push(word));
    });
    this.keywords(keywords.join(','));
  }


}
