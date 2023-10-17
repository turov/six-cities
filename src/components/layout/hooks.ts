import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from './types.ts';

export const useAppOutletContext = () => useOutletContext<OutletContextType>();

export const usePageInfo = ({ title, description } = { title: '', description: '' }) => {
  const [pageInfo, setPageInfo] = useState({ title, description });

  useEffect(() => {
    setPageInfo({ title, description });
  }, [description, title]);

  return { pageInfo, setPageInfo };
};

export const useToggle = (initialValue = true) => {
  const [value, setValue] = useState(initialValue);

  const toggleOn = useCallback(() => setValue(true), []);
  const toggleOff = useCallback(() => setValue(false), []);

  return { value, toggleOn, toggleOff };
};
