
export class ResumeSection {
  constructor(
    data?: any,
    public title: string = data?.title ?? 'Untitled Section',
    public icon: string = data?.icon ?? '',
    public type: 'experience' | 'skill' = data?.type ?? 'experience',
    public items: ResumeItem[] = []
  ) {
    if (data?.items) {
      this.items = (<[]>data.items).map(i => new ResumeItem(i));
    }
  }

  add(item?: ResumeItem) {
    this.items.push(item ?? new ResumeItem());
  }

  remove(item: ResumeItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

export class ResumeItem {
  constructor(
    data?: any,
    public title: string = data?.title ?? '',
    public description: string = data?.description ?? '',
  ) {

  }
}
