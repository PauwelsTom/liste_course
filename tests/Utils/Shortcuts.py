import re
from playwright.sync_api import Page, expect
from Utils.Functions import *


def click_product(page, logger, id, total):
    """
    Automatise le clic sur un produit
    
    *Renvoie le prix de l'article (int)*
    """
    elt = page.locator(id)
    elt.click()
    expect(elt).to_have_class("AjoutSelected")
    prix = get_price(elt.text_content())
    prod = get_product(elt.text_content())
    expect(page.locator("#currentTotalSpan")).to_contain_text(str(total + float(prix)))
    logger.log(f"Ajout de '{prod}' avec succès.\nTotal: {total + float(prix)} [+{prix}]")
    return float(prix)