from django.conf.urls import url
import coma.views as views

urlpatterns = [
    url(
        r'^top_up$',
        views.start_payment,
        name="coma_top_up"
    ),
    url(
        r'^top_up_end/(?P<id>\d+)$',
        views.finish_payment,
        name="coma_top_up_end"
    ),
    url(
        r'^reader$',
        views.TransactionMakerView.as_view(),
        name="coma_reader"
    ),
    url(
        r'^product/delete/(?P<pid>\d+)$',
        views.ProductDelete,
        name="coma_product_delete"
    ),
    url(
        r'^products/',
        views.ProductCreationView.as_view(),
        name="coma_products"
    ),
]
