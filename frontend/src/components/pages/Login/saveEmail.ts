import { SaveEmailType } from './types';

export const getSavedEmail = () => {
  const email: string | null = localStorage.getItem('email');
  return email || '';
};

export const saveEmail = ({ checked, email }: SaveEmailType) => {
  if (checked) {
    localStorage.setItem('email', email);
  } else {
    localStorage.removeItem('email');
  }
};
