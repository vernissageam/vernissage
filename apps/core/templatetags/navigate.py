# -*- encoding utf-8 -*-


from django import template

register = template.Library()


@register.filter
def pagination_url_replace(page, request):
    """
    Add another GET params to the Url on pagination
    :param page: page number
    :param request: current request
    :return: new url
    """

    dict_ = request.GET.copy()
    dict_['page'] = page

    return dict_.urlencode()
