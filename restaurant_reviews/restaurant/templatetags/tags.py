from django import template

register = template.Library()


@register.filter
def by_category(self, category_id):
    list_rating = self.get_category_rating()
    if not list_rating.filter(id=category_id).exists():
        return 0
    else:
        rate = list_rating.get(id=category_id)
        return rate.value
