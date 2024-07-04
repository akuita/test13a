import { ClassConstructor, plainToClass } from 'class-transformer'

export function serialize<T, O>(transformClass: ClassConstructor<T>, plainObject: O) {
  return plainToClass(transformClass, plainObject, { excludeExtraneousValues: true })
}

export function serializeArray<T, O>(transformClass: ClassConstructor<T>, plainArray: O[]) {
  return plainArray.map((object) =>
    plainToClass(transformClass, object, { excludeExtraneousValues: true }),
  )
}

export function formatDateTime(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return new Intl.DateTimeFormat('default', options).format(now).replace(/\//g, '-').replace(',', '');
}