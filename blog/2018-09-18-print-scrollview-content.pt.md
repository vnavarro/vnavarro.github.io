---
title: "[QuickTips] Screenshot de uma ScrollView no iOS (Swift)"
description: Como fazer o print do conteúdo de uma ScrollView.
date: 2018-09-17 17:40:00
image: 'assets/img/08.jpg'
category: 'Desenvolvimento'
background: '#353b48'
---

O próximo desafio está sempre virando a esquina de nossas vidas e um dos desafios bacanas que tenho para passar dessa vez é fazer um print do content completo de uma **scrollview**.

Antes de imprimir temos que converter o conteúdo da **scrollview** em uma **UIImage**. Vejamos o passo-a-passo e o código completo.

1. Criar uma **extension** de **UIScrollView** com o método **toImage** que retorna uma **UIImage**;
2. Usar o **UIGraphicsBeginImageContext** com o **contentSize**;
3. Armazenar: **contentOffset**, **frame**, **showsVerticalScrollIndicator** e **showsVerticalScrollIndicator**. Assim podemos retornar esses valores para o que eram antes;
4. Colocar **showsVerticalScrollIndicator** e **showsHorizontalScrollIndicator** para **false**. Não queremos **scrolls** na nossa imagem;
5. Setar **contentOffset** para **CGPoint.zero**. Queremos um **frame** começando sem considerar o **scroll** que o usuário possa ter feito;
6. Igualamos o frame da **ScrollView** com o seu conteúdo, assim todo o conteúdo fica "visível";
7. Renderizamos o **layer** da **ScrollView** no contexto atual;
8. Transformamos o contexto atual em imagem;
9. Resetamos os valores das propriedades modificadas para seus valores originais, e;
10. Encerramos o contexto retornando a imagem gerada como resultado da função.

Transformando essa idéia em código propriamente dito temos:

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

Agora que conseguimos uma imagem do conteúdo completo da **ScrollView** podemos chamar o **UIPrintInteractionController** para fazer o resto do trabalho pesado para nós.

O único import necessário aqui é o **UIKit**, gerei uma função onde recebemos a **ScrollView** e uma função para quando o print falhar.

O código deve ser bem fácil de compreender, o que fazemos é criar o **UIPrintInteractionController** com os **settings** desejados e passar a imagem gerada pelo **toImage** para a propriedade **printingItem**.

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

Com isso podemos imprimir o conteúdo de qualquer **UIScrollView** ou usá-lo como imagem. 😉👋

Foto da capa ChristopherPluta no Pixabay