export function getExtension(filename: string): string {
  const extenstion = filename.split(".").pop()
  return extenstion || "" ;
}

export function removeExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return filename;
  const file = filename.substring(0, lastDotIndex);
  console.log(file)
  return file
}

export function extensionDetailFinder(extension: string): string {
  extension = extension.toLowerCase();

  switch(extension){

// windows files
    case "exe":
      return "Application"
    case "msi":
      return "Windows Installer Package"
    case "dll":
      return "Application extension"
    case "txt":
      return "Text Document"
    case "gitignore":
      return "Git Ignore Source File"

// microsoft suite
    case "pptx":
      return "Microsoft PowerPoint Presentation"
    case "ppt":
      return "Microsoft PowerPoint 97-2003 Presentation"
    case "docx":
      return "Microsoft Word Document"
    case "doc":
      return "Microsoft Word 97-2003 Document"

// image, video and audio
    case "png":
      return "PNG File"
    case "jpeg":
      return "JPEG File"
    case "jpg":
      return "JPG File"
    case "webp":
      return "WEBP File"
    case "flac":
      return "Text Document"

// Language
    case "json":
      return "JSON Source File"
    case "py":
      return "Python Source File"
    case "pyc":
      return "Compiled Python File"

// other incounterd files
    case "inp":
      return "Compiled Python File"

    default:
      return "";
  }
}