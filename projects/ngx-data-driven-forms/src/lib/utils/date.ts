export class DateUtils {


  public static normalizeDate(dateObj: Date | string, clearHours?: boolean): Date {

    let returnObj: string | Date;

    if (typeof dateObj === 'string' && dateObj.startsWith('$today')) {
      returnObj = new Date();
    } else {
      returnObj = new Date(dateObj);
    }

    if (clearHours) {
      returnObj.setHours(0, 0, 0, 0);
    }

    return returnObj;
  }

  public static calculateAge(dateOfBirth: any): number {
    dateOfBirth = new Date(dateOfBirth);
    const diffMs = Date.now() - dateOfBirth.getTime();
    const ageDt = new Date(diffMs);

    return Math.abs(ageDt.getUTCFullYear() - 1970);

  }

}
