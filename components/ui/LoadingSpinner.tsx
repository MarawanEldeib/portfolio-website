import { LOADING_SPINNER_CLASSES } from '@/lib/constants';

export default function LoadingSpinner() {
  return (
    <div className={LOADING_SPINNER_CLASSES.container}>
      <div className={LOADING_SPINNER_CLASSES.spinner}></div>
    </div>
  );
}
