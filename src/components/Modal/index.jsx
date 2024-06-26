import React, { Component } from 'react'
import Portal from './Portal'
import { IoCloseSharp } from "react-icons/io5";

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props

    return (
      <Portal>
        {
          active && (
            <div className="fixed top-0  left-0 w-full h-full text-slate-200 bg-black bg-opacity-60 flex justify-center items-center">
              <div className="relative  dark:bg-slate-900 text-slate-200 border border-gray-200 dark:border-gray-400 rounded-sm bg-white w-[70%] h-[70%] p-20 rounded-5 shadow-md">
                <button onClick={toggle} className="absolute top-0 right-0 bg-transparent border-none text-2xl px-6 py-5 cursor-pointer">
                  <IoCloseSharp/>
                </button>
                {children}
              </div>
            </div>
          )
        }
      </Portal>
    )
  }
}
