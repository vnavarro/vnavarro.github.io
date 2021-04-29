---
title: '[QuickTips] UIScrollView Screenshot on iOS (Swift)'
date: '2018-09-17 17:40:00'
description: O Markdown deve ser o mais fácil de ler e escrever o mais possível.
category: Development
background: '#353b48'
image: '/assets/img/03.jpg'
---

The next challenge is always hanging around in our lives and today there is a cool one to share, printing the full content of a scrollview. 

But before we can print anything the content should be transformed into an UIImage. Next is the breakdown of the process:

1. Create an UIScrollView extension with a method called toImage that returns an UIImage;
2. Use UIGraphicsBeginImageContext with contentSize;
3. Store: contentOffset, frame, showsVerticalScrollIndicator and showsVerticalScrollIndicator. So they can be restored to original values before changes;
4. Set showsVerticalScrollIndicator and showsHorizontalScrollIndicator to false. Scrolls are not required in the final image;
5. Set contentOffset to CGPoint.zero. The frame should not be influentiated by user's swipes;
6. Set scrollview frame to its content values, that way all the content becames "visible";
7. Render scrollview's layer in the current context;
8. Transform current context into an image;
9. Reset stored values to its original values, and;
10. End the context returning the generated image as the result.

Transforming that into code:

```SWIFT
import UIKit
extension UIScrollView {
    func toImage() -> UIImage? {
        UIGraphicsBeginImageContext(contentSize)
        
        let savedContentOffset = contentOffset
        let savedFrame = frame
        let saveVerticalScroll = showsVerticalScrollIndicator
        let saveHorizontalScroll = showsHorizontalScrollIndicator
        
        showsVerticalScrollIndicator = false
        showsHorizontalScrollIndicator = false
        contentOffset = CGPoint.zero
        frame = CGRect(x: 0, y: 0, width: contentSize.width, height: contentSize.height)
        
        layer.render(in: UIGraphicsGetCurrentContext()!)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        
        contentOffset = savedContentOffset
        frame = savedFrame
        showsVerticalScrollIndicator = saveVerticalScroll
        showsHorizontalScrollIndicator = saveHorizontalScroll
        
        UIGraphicsEndImageContext()
        
        return image
    }
}
```

Now, with a image in hands a UIPrintInteractionController can be called to do the rest of the heavy job.

The only import needed is UIKit and following is a function where we receive the scrollview to print and a function to call when failure happens.

The code should be easy to read, it comprises the creation of UIPrintInteractionController with desired settings and  passing the image from toImage to printingItem.

```SWIFT
func onPrintReceipt(from view: UIScrollView, onPrintFailed: @escaping () -> Void) {
    let screenshot = view.toImage()
    
    if (screenshot == nil) {
        onPrintFailed()
        return
    }
    
    let printController = UIPrintInteractionController.shared
    let printInfo = UIPrintInfo(dictionary: [:])
    printInfo.outputType = UIPrintInfoOutputType.general
    printInfo.orientation = UIPrintInfoOrientation.portrait
    printInfo.jobName = "Print"
    printController.printInfo = printInfo
    printController.showsPageRange = true
    printController.printingItem = screenshot
    
    printController.present(animated: true) { (controller, completed, error) in
        if(!completed && error != nil){
            onPrintFailed()
        }
    }
}
```

With that apps now can print full content of any UIScrollView, or use it as an image. 😉👋

Cover picture ChristopherPluta no Pixabay