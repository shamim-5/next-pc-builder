function Title({ children, titleStyle }) {
   return (
      <h1 className={titleStyle}>
         {children}
      </h1>
   )
}

export default Title;