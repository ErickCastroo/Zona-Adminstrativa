import React, { Component } from 'react'
import Portal from './Portal'

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props

    return (
      <Portal>
        {
          active && (
            <div className="modal">
              <div className="modal__container">
                <button onClick={toggle} className="modal__close">
                  X
                </button>
                {children}
              </div>
              <style jsx>{`
                .modal {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.6);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .modal__container {
                  position: relative;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }
                .modal__close {
                  position: absolute;
                  top: 0;
                  right: 0;
                  background-color: transparent;
                  border: none;
                  font-size: 20px;
                  padding: 10px;
                  cursor: pointer;
                }
              `}</style>
            </div>
          )
        }

      </Portal>
    )
  }
}
