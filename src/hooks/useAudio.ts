
import { useContext } from 'react';
import { AudioContext } from '../components/AudioProvider';

export const useAudio = () => {
  return useContext(AudioContext);
};
