from rest_framework import serializers
from .models import CustomUser, DiscussionForum, DiscussionForumAnswer, DiscussionAnswerReply, DiscussionForumVote, DiscussionForumAnswerVote

class DiscussionForumSerializer(serializers.ModelSerializer):
    vote = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()
    class Meta:
        model = DiscussionForum
        fields = ['id', 'title', 'description', 'created_at', 'is_resolved', 'user', 'vote', 'user_vote']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = {
            'id': instance.user.id,
            'first_name': instance.user.first_name,
            'last_name': instance.user.last_name
        }
        return data
    def get_vote(self, obj):
        upvotes = obj.discussionforumvote_set.filter(vote='up').count()
        downvotes = obj.discussionforumvote_set.filter(vote='down').count()
        return upvotes - downvotes
    def get_user_vote(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
        vote = DiscussionForumVote.objects.filter(discussion=obj, user=user).first()
        if vote:
            return vote.vote
        else:
            return None
class DiscussionAnswerReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = DiscussionAnswerReply
        fields = ['id', 'reply', 'created_at', 'user']
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name
        }
    
class DiscussionForumAnswerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    vote = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()
    reply = serializers.SerializerMethodField()
    class Meta:
        model = DiscussionForumAnswer
        fields = ['id', 'answer', 'created_at', 'user', 'is_accepted', 'reply', 'vote', 'user_vote']
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name
        }
    def get_vote(self, obj):
        upvotes = obj.discussionforumanswervote_set.filter(vote='up').count()
        downvotes = obj.discussionforumanswervote_set.filter(vote='down').count()
        return upvotes - downvotes
    def get_user_vote(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
        vote = DiscussionForumAnswerVote.objects.filter(discussion=obj, user=user).first()
        if vote:
            return vote.vote
        else:
            return None
    def get_reply(self, obj):
        request = self.context.get('request')
        replies = DiscussionAnswerReply.objects.filter(discussion_forum_answer=obj)
        if not replies:
            return None
        serializer = DiscussionAnswerReplySerializer(replies, many=True, context={'request': request})
        return serializer.data

class DiscussionForumDetailsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()
    vote = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()
    class Meta:
        model = DiscussionForum
        fields = ['id', 'title', 'description', 'created_at', 'is_resolved', 'user', 'answers', 'vote', 'user_vote']
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name
        }
    def get_answers(self, obj):
        request = self.context.get('request')
        answers = DiscussionForumAnswer.objects.filter(discussion_forum=obj)
        serializer = DiscussionForumAnswerSerializer(answers, many=True, context={'request': request})
        return serializer.data
    def get_vote(self, obj):
        upvotes = obj.discussionforumvote_set.filter(vote='up').count()
        downvotes = obj.discussionforumvote_set.filter(vote='down').count()
        return upvotes - downvotes
    def get_user_vote(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
        vote = DiscussionForumVote.objects.filter(discussion=obj, user=user).first()
        if vote:
            return vote.vote
        else:
            return None
