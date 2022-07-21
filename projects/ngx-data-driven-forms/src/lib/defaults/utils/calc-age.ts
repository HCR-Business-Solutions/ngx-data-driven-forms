export default function calcAge(dateOfBirth: Date): number {
  return Math.abs(
    new Date(Date.now() - dateOfBirth.getTime()).getFullYear() - 1970
  );
}
