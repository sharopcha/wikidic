import React, { useContext, useEffect } from 'react';
import ModalForm from './ModalForm';
import wordContext from '../context/word/wordContext';
import AuthContext from '../context/auth/authContext';

export default function Word() {
  const WordContext = useContext(wordContext);
  const authContext = useContext(AuthContext);
  const { current, words, getWords, openModal, deleteTerm } = WordContext;
  const { user } = authContext;

  useEffect(() => {
    if (current === null) {
      getWords();
    }
  }, []);

  const onDelete = () => {
    deleteTerm(current._id);
    getWords();
  };
  return (
    <div className='pt-3'>
      <div className='card p-3'>
        <div className='card-body row'>
          {current !== null && current.term}
          {/* TO DO 
            Need to be inplemented when user authenticated
          */}
          {current && (
            <a
              onClick={() => {
                if (current._id !== null) openModal('Definition');
              }}
              className='btn btn-outline-success text-right ml-auto'
            >
              New definition
            </a>
          )}
          {user && (
            <i
              className='fas fa-trash-alt text-right ml-auto mr-3'
              onClick={onDelete}
            ></i>
          )}
          {/* {current !== null && current.term} */}
        </div>
        <ModalForm />

        {/* -------------------DEFINITION SECTION--------------------------------------- */}
        {current &&
          current.definition.map((def, i) => {
            return (
              <div key={i} className='definition ml-5 mb-3'>
                <div className='card-body'>
                  <div className='card-text'>{def.title}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
