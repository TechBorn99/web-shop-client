import { message, Modal } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { MessageKey } from './messages.types';

const DURATION = 3; // in seconds

export const startLoadingMessage = (key: MessageKey) => {
  message.loading({ content: 'Data is being processed...', key });
};

export const showSuccessMessage = (text: string, key?: MessageKey) => {
  message.success({ content: text, key, duration: DURATION });
};

export const showErrorMessage = (text: string, key?: MessageKey) => {
  message.error({ content: text, key, duration: DURATION });
};

export const showConfirmMessage = (title: string, text: string, onOk: any) => {
  confirm({
    type: 'confirm',
    onOk,
    title,
    content: text,
  });
};

export const destroyAllModals = () => {
  Modal.destroyAll();
};
