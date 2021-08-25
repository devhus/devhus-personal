import { SkillInfo } from './skill-info.interface';

export class ResumeInfo {
  constructor(
    data?: any,
    public first_name: string = data?.first_name ?? 'Joe',
    public last_name: string = data?.last_name ?? 'Doe',
    public email_address: string = data?.email_address ?? '',
    public description: string = data?.description ?? '',
    public phone_number: string = data?.phone_number ?? '',
    public address: string = data?.address ?? '',
    public working_since: Date = data?.working_since ? new Date(data.working_since) : new Date(),
    public cv_link: string = data?.cv_link ?? '',
    public social: SoicalItem[] = [],
    public skills: SkillInfo[] = [],
  ) {
    if (data?.social) {
      this.social = (<[]>data.social).map(i => new SoicalItem(i));
    }
    if (data?.skills) {
      this.skills = (<[]>data.skills).map(i => new SkillInfo(i));
    }
  }

  get cv_file() {
    return this.cv_link.split('/').pop();
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`
  }

  get experienceYears() {
    return new Date().getFullYear() - this.working_since.getFullYear();
  }
  get workingSince() {
    return `${this.working_since.getFullYear()}-${this.pad(this.working_since.getMonth() + 1)}-${this.pad(this.working_since.getDate())}`;
  }

  set workingSince(dateString: string) {
    const dateSplits = dateString.split('-');
    const date = new Date();
    date.setFullYear(+dateSplits[0], (+dateSplits[1]) - 1, +dateSplits[2]);
    this.working_since = date;
  }

  private pad(number: number, padding: number = 2) {
    return ("0".repeat(padding) + number).slice(-padding)
  }

  addSocialItem(item?: SoicalItem) {
    this.social.push(item ?? new SoicalItem());
  }

  removeSocialItem(item: SoicalItem) {
    this.social.splice(this.social.indexOf(item), 1);
  }

  addSkill(skill?: SkillInfo) {
    this.skills.push(skill ?? new SkillInfo());
  }

  removeSkill(skill: SkillInfo) {
    this.skills.splice(this.skills.indexOf(skill), 1);
  }
}

export class SoicalItem {
  constructor(
    data?: any,
    public name: string = data?.name ?? '',
    public icon: string = data?.icon ?? '',
    public link: string = data?.link ?? ''
  ) {

  }
}
