import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ddforms-advanced-text',
  templateUrl: './advanced-text.component.html',
})
export class AdvancedTextComponent {
  @Input() text: string | null = null;

  private readonly escapePattern = new RegExp(/(\$\!\([A-Za-z\: ,\/\<\>]*\))/g);

  private readonly handledTags: { [key: string]: (args: string[]) => string } =
    {
      abbr: (args: string[]) =>
        `<abbr title="${args[1] ?? ''}">${args[0] ?? ''}</abbr>`,
      b: (args: string[]) => `<b>${args.join(' ')}</b>`,
      i: (args: string[]) => `<i>${args.join(' ')}</i>`,
      a: (args: string[]) =>
        `<a href="${args[1] ?? ''}" target=${args[2] ?? '_blank'}>${
          args[0]
        }</a>`,
      br: () => '<br />',
      small: (args: string[]) => `<small>${args.join(' ')}</small>`,
      strong: (args: string[]) => `<strong>${args.join(' ')}</strong>`,
      sup: (args: string[]) => `<sup>${args.join(' ')}</sup>`,
      sub: (args: string[]) => `<sub>${args.join(' ')}</sub>`,
    };

  constructor() {}

  private readonly tokenize: (arg: string) => string[] = (arg: string) => {
    if (arg.match(this.escapePattern)) {
      return arg.split(this.escapePattern);
    }
    return [arg];
  };

  private readonly tagHandler: (tag: string, args: string[]) => string = (
    tag: string,
    args: string[]
  ) => {
    const tagFunction = this.handledTags[tag];
    if (tagFunction !== undefined) {
      return tagFunction(args);
    }
    return `${tag} ${args.join(' ')}`;
  };

  private readonly parse: (arg: string) => string = (arg: string) => {
    if (arg.match(this.escapePattern) && arg.includes(':')) {
      const temp = arg
        .slice(3, arg.length - 1)
        .split(':')
        .map((_) => _.trim());
      const parsed: [string, string[]] = [
        temp[0],
        temp[1].split(',').map((_) => _.trim()),
      ];
      return this.tagHandler(parsed[0], parsed[1]);
    }
    return arg;
  };

  private readonly run: (arg: string) => { input: string; result: string } = (
    arg: string
  ) => {
    let result = arg;
    while (result.match(this.escapePattern)) {
      result = this.tokenize(result)
        .map((token) => this.parse(token))
        .join('');
    }
    return { input: arg, result };
  };

  public shouldUseProcessor(): boolean {
    return (this.text ?? '').match(this.escapePattern) !== null;
  }

  public get processedText(): string {
    if (!this.text) {
      return '';
    }

    const processPack = this.run(this.text ?? '');

    return processPack.result;
  }
}
