import { React, createContext, useContext, useState } from "react"

const StateContext = createContext()

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [isClicked, setIsClicked] = useState(initialState)
  const [screenSize, setScreenSize] = useState(undefined)
  const [currentColor, setCurrentColor] = useState("#03C9D7")
  const [currentMode, setCurrentMode] = useState("Dark")
  const [themeSettings, setThemeSettings] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [loadingStock, setLoadingStock] = useState(true)
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [orderData, setOrderData] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [stockData, setStockData] = useState([])
  const [ordersError, setOrdersError] = useState(null)
  const [customersError, setCustomersError] = useState(null)
  const [stockError, setStockError] = useState(null)

  const setMode = (mode) => {
    setCurrentMode(mode)
    localStorage.setItem("themeMode", mode)
    setThemeSettings(false)
  }
  const setColor = (color) => {
    setCurrentColor(color)
    localStorage.setItem("colorMode", color)
    setThemeSettings(false)
  }
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true })
  }
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        loadingOrders,
        setLoadingOrders,
        loadingStock,
        setLoadingStock,
        loadingCustomers,
        setLoadingCustomers,
        orderData,
        setOrderData,
        customerData,
        setCustomerData,
        stockData,
        setStockData,
        ordersError,
        setOrdersError,
        customersError,
        setCustomersError,
        stockError,
        setStockError,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
