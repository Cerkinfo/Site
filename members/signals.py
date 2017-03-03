# from django.db.models import signals


# def create_member_for_user(sender, instance, created, **kwargs):
#     try:
#         instance.member
#     except User.member.RelatedObjectDoesNotExist:
#         Member.objects.create(user=instance)

# signals.post_save.connect(create_member_for_user, sender=User, weak=False)
