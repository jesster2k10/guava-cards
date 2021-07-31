/* eslint-disable quotes */
export class PersonName {
  public constructor(public firstName: string, public lastName?: string) {}

  get full(): string {
    return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName
  }

  get familiar(): string {
    return this.lastName ? `${this.firstName} ${this.lastName.charAt(0)}.` : this.firstName
  }

  get abbreviated(): string {
    return this.lastName ? `${this.firstName.charAt(0)}. ${this.lastName}` : this.firstName
  }

  public posessive = (method: 'full' | 'first' | 'last') => {
    const name = (() => {
      switch (method) {
        case 'full':
          return this.full
        case 'first':
          return this.firstName
        case 'last':
          return this.lastName
      }
    })()

    return `${name}${name?.endsWith('s') ? "'" : "'s"}`
  }
}
