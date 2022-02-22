import { Component, Input, OnInit } from '@angular/core';




@Component({
    selector: 'ddforms-advanced-text',
    templateUrl: './advanced-text.component.html'
})
export class AdvancedTextComponent implements OnInit {

    @Input() text: string | null = null;



    private readonly handledTags: {[key: string]: (args: string[]) => string} = {
        'abbr': (args: string[]) => `<abbr title="${args[1] ?? ''}">${args[0] ?? ''}</abbr>`,
        'b': (args: string[]) => `<b>${args.join('')}</b>`,
        'i': (args: string[]) => `<i>${args.join('')}</i>`,
        'a': (args: string[]) => `<a href="${args[1] ?? ''}" target=${args[2] ?? '_blank'}>${args[0]}</a>`,
        'br': () => '<br />',
        'small': (args: string[]) => `<small>${args.join('')}</small>`,
        'strong': (args: string[]) => `<strong>${args.join('')}</strong>`
    } 
    
    constructor() { }

    ngOnInit() { }

    public shouldUseProcessor(): boolean {
        return (this.text ?? '').includes('$!');
    }

    private processText(text: string): string {
        if (!text.includes('$!')) return text;
        return text.split(/(?=\$\!)/g).map((token) => {
            if (token.startsWith('$!(')) {
              const comp = token.substring(3, (token.length - 1)).split(/\:(.+)/);
              const tag = comp[0];
              const args = comp[1].split(',').map(_ => _.trim());
              if (this.handledTags[tag]) {
                return this.handledTags[tag](args);
              }
              return token;
              
            }
            return token;
          }).join('');
    }

    public get processedText(): string {
        if (!this.text) {
            return '';
        }
        return this.processText(this.text);
    }

}