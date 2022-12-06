from django.contrib.auth.models import User
from django.utils import timezone

from accounts.models import GetUserExtension, UserClassInterface, \
    UserSubscription


def ManageActiveSubscriptions():
    '''
    Checks every user, if their active subscription is over and they
    do not have a recurring or subsequent subscription, temporarily
    un-enroll the user from their future classes.

    If a user's subscription will end in the next 24 hours and they have
    a recurring, unpaid subscription in the future, pay for and begin
    that subscription.

    '''
    now = timezone.now()
    allUsers = User.objects.all()
    for user in allUsers:
        uext = GetUserExtension(user)
        activeSub = uext.active_subscription
        if activeSub is not None:
            if activeSub.end_time < now:
                # sub has expired
                checkFutureSubs(user, uext)
            else:
                pass
                # user sub is still active.
        else:
            checkFutureSubs(user, uext)

def checkFutureSubs(user, uext):
    now = timezone.now()
    futureSubs = UserSubscription.objects.filter(end_time__gt=now).order_by('start_time')
    if futureSubs.count() == 0:
        # no future subscriptions to active, temporarily un-enroll
        unEnroll(user, uext)
    else:
        nextSub = futureSubs.first()
        if nextSub.start_time < now:
            uext.active_subscription: nextSub
            # TODO: Validate Payment
            if nextSub.payment_time == None:
                nextSub.payment_time = now
                nextSub.save()
            uext.save()
        else:
            unEnroll(user, uext)


def unEnroll(user, uext):
    now = timezone.now()
    ucis = UserClassInterface.objects.filter(user=user, class_session__date__gt=now)

    for uci in ucis:
        classSession = uci.class_session
        classSession.enrollment_count -= 1
        uci.active = False
        uci.financial_hold = True
        uci.save()
        classSession.save()

