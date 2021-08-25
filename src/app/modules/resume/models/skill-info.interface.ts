export class SkillInfo {
  constructor(
    data?: any,
    public name: string = data?.name ?? 'Untitled Skill',
    public percent: number = data?.percent ?? 0,
    public icon: string = data?.icon ?? ''
  ) {

  }
}