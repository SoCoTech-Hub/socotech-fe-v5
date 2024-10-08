export const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "#fff",
  borderStyle: "dashed",
  backgroundColor: "transparent",
  color: "#fff",
  outline: "none",
  transition: "border .24s ease-in-out",
}

export const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  marginTop: 16,
}

export const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginLeft: 4,
  marginRight: 4,
  width: 98,
  height: 98,
  padding: 4,
  boxSizing: "border-box",
}

export const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

export const removeImageButton = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  color: "#ff1744",
  cursor: "pointer",
  width: 98,
  backgroundColor: "transparent",
  border: "none",
  marginBottom: 15,
}

export const img = {
  width: "100%",
  height: "100%",
}

export const activeStyle = {
  borderColor: "#2196f3",
}

export const acceptStyle = {
  borderColor: "#00e676",
}

export const rejectStyle = {
  borderColor: "#ff1744",
}
