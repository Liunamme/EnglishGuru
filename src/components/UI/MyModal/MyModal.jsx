import React, { useContext } from 'react';
import style from './MyModal.module.css'
import { StoreContext } from '../../../context/context';

const MyModal = ({ children, visible, setVisible, modalInBlock, className }) => {
	// const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	return (
		<div className={visible ? `${style.myModal} ${style.modalActive} ${modalInBlock ? style.modalInBlock : ''}` : `${style.myModal} ${modalInBlock ? style.modalInBlock : ''}`}>
			<div className={`${visible ? `${style.myModalContent} ${className} ${style.contentActive}` : style.myModalContent}`} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default MyModal;