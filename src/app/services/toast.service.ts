import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController

  ) { }
  Showtoast(msg, type): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom',
        cssClass: type

      });
      toast.present();
    });
  }

  ShowMsg(id, functioname: string) {
    if (id == -1) {
      return functioname + " Saved Successfully";
    }
    else if (id > 0) {
      return functioname + " Updated Successfully";
    }
  }
  ShowCustomToast(customtxt, customToastBg ) {
    //  var snackbar = document.querySelector(".snackbar")
    var snackbar = document.getElementById("snackbar")
    var IDicon = document.getElementById("IDicon")
    snackbar.innerHTML = customtxt
    // IDicon.innerHTML = icon
    snackbar.className = "show";
    snackbar.classList.add(customToastBg)

    setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }
}
