import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenStringPipe implements PipeTransform {

  transform(value: string, charactersToUse = 10): string {
    const shortenValue = value.slice(0, charactersToUse);
    console.log("Shorten from pipe!", `'${value}'`, `'${shortenValue}'`);
    if(value.length == shortenValue.length){
      return shortenValue;
    }
    debugger
    if (shortenValue[shortenValue.length -1] == '.') {
      return shortenValue.slice(0, shortenValue.length-1) + '...';
    }
    if (shortenValue[shortenValue.length -2]+shortenValue[shortenValue.length -1]== '. ') {
      return shortenValue.slice(0, shortenValue.length-2) + '...';
    }
    return shortenValue + '...'
  }

}
