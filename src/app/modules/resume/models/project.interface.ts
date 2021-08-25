export class Project {
  constructor(
    data?: any,
    public name: string = data?.name ?? 'Untitled Project',
    public description: string = data?.description ?? '',
    public category: ProjectCategories = data?.category ?? 'web',
    public other_categories: ProjectCategories[] = data?.other_categories ?? [],
    public images: string[] = data?.images ?? [],
    public client: string = data?.client ?? '',
    public demo_link: string = data?.demo_link ?? '',
    public languages: string[] = data?.languages ?? [],
    public created_at: Date = data?.created_at ? new Date(data.created_at) : new Date(),
  ) {

  }

  public get slug() {
    return this.name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      ;
  }

  get categories() {
    return [this.category, ...this.other_categories]
  }

  trackBy(index: number, obj: any): any {
    return index;
  }

  addLanguage(language?: string) {
    this.languages.push(language ?? '');
  }

  removeLanguage(language: string) {
    this.languages.splice(this.languages.indexOf(language), 1);
  }

  addImage(image?: string) {
    this.images.push(image ?? '');
  }

  removeImage(image: string) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  addCategory(categroy?: ProjectCategories) {
    this.other_categories.push(categroy ?? 'web');
  }

  removeCategory(categroy: ProjectCategories) {
    this.other_categories.splice(this.other_categories.indexOf(categroy), 1);
  }
}

export type ProjectCategories = 'web' | 'desktop' | 'design';