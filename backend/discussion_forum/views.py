from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from utils.utils import xp_to_level
from rest_framework.permissions import IsAuthenticated
from .models import DiscussionForum, DiscussionForumAnswer, DiscussionAnswerReply, DiscussionForumVote, DiscussionForumAnswerVote
from .serializers import DiscussionForumSerializer, DiscussionForumAnswerSerializer, DiscussionAnswerReplySerializer,DiscussionForumDetailsSerializer


# Create your views here.
class AddDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        user = request.user
        discussion = DiscussionForum.objects.create(title=title,description=description,user=user)
        user.xp += 10
        user.level = xp_to_level(user.xp)
        user.save()
        return Response({"message":"Discussion added successfully"},status=status.HTTP_201_CREATED)
class DiscussionView(generics.ListAPIView):
    queryset = DiscussionForum.objects.all().order_by('-created_at')
    serializer_class = DiscussionForumSerializer

class DiscussionDetailsView(generics.RetrieveAPIView):
    serializer_class = DiscussionForumDetailsSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        return DiscussionForum.objects.filter(id=pk).order_by('-created_at')

    
class AddAnswerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        answer = request.data.get('answer')
        user = request.user
        discussion = DiscussionForum.objects.get(id=pk)
        discussion_answer = DiscussionForumAnswer.objects.create(answer=answer,user=user,discussion_forum=discussion)
        user.xp += 15
        user.level = xp_to_level(user.xp)
        user.save()
        return Response({"message":"Answer added successfully"},status=status.HTTP_201_CREATED)
class ReplyAnswerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request,aid):
        reply = request.data.get('reply')
        user = request.user
        discussion_answer = DiscussionForumAnswer.objects.get(id=aid)
        discussion_answer_reply = DiscussionAnswerReply.objects.create(reply=reply,user=user,discussion_forum_answer=discussion_answer)
        user.xp += 5
        user.level = xp_to_level(user.xp)
        user.save()
        return Response({"message":"Reply added successfully"},status=status.HTTP_201_CREATED)
class EditDiscussionView(generics.UpdateAPIView):
    queryset = DiscussionForum.objects.all()
    serializer_class = DiscussionForumSerializer
    permission_classes = [IsAuthenticated]
    def update(self, request, *args, **kwargs):
        fid = kwargs['pk']
        discussion = DiscussionForum.objects.get(id=fid)
        if discussion.user == request.user:
            serializer = self.get_serializer(discussion, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to edit this discussion."},status=status.HTTP_403_FORBIDDEN)

class DeleteDiscussionView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = DiscussionForum.objects.all()
    def destroy(self, request, *args, **kwargs):
        fid = kwargs['pk']
        discussion = DiscussionForum.objects.get(id=fid)
        if discussion.user == request.user:
            discussion.delete()
            return Response({"message":"Discussion deleted successfully"},status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to delete this discussion."},status=status.HTTP_403_FORBIDDEN)
class EditAnswerView(generics.UpdateAPIView):
    queryset = DiscussionForumAnswer.objects.all()
    serializer_class = DiscussionForumAnswerSerializer
    permission_classes = [IsAuthenticated]
    def update(self, request, *args, **kwargs):
        aid = kwargs['aid']
        answer = DiscussionForumAnswer.objects.get(id=aid)
        if answer.user == request.user:
            serializer = self.get_serializer(answer, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to edit this answer."},status=status.HTTP_403_FORBIDDEN)
class DeleteAnswerView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = DiscussionForumAnswer.objects.all()
    def destroy(self, request, *args, **kwargs):
        aid = kwargs['aid']
        answer = DiscussionForumAnswer.objects.get(id=aid)
        if answer.user == request.user:
            answer.delete()
            return Response({"message":"Answer deleted successfully"},status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to delete this answer."},status=status.HTTP_403_FORBIDDEN)
class EditReplyView(generics.UpdateAPIView):
    queryset = DiscussionAnswerReply.objects.all()
    serializer_class = DiscussionAnswerReplySerializer
    permission_classes = [IsAuthenticated]
    def update(self, request, *args, **kwargs):
        rid = kwargs['rid']
        reply = DiscussionAnswerReply.objects.get(id=rid)
        if reply.user == request.user:
            serializer = self.get_serializer(reply, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to edit this reply."},status=status.HTTP_403_FORBIDDEN)
class DeleteReplyView(generics.DestroyAPIView):
    queryset = DiscussionAnswerReply.objects.all()
    permission_classes = [IsAuthenticated]
    def destroy(self, request, *args, **kwargs):
        rid = kwargs['rid']
        reply = DiscussionAnswerReply.objects.get(id=rid)
        if reply.user == request.user:
            reply.delete()
            return Response({"message":"Reply deleted successfully"},status=status.HTTP_200_OK)
        return Response({"message":"You do not have permission to delete this reply."},status=status.HTTP_403_FORBIDDEN)
class UpvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        discussion = DiscussionForum.objects.get(id=pk)
        user = request.user
        vote = DiscussionForumVote.objects.filter(discussion=discussion,user=user).first()
        if vote:
            if vote.vote == 'up':
                vote.vote = 'none'
                vote.save()
            else:
                vote.vote = 'up'
                vote.save()
        else:
            user.xp += 5
            user.level = xp_to_level(user.xp)
            user.save()
            DiscussionForumVote.objects.create(discussion=discussion,user=user,vote='up')
        return Response(status=status.HTTP_200_OK)
class DownvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        discussion = DiscussionForum.objects.get(id=pk)
        user = request.user
        vote = DiscussionForumVote.objects.filter(discussion=discussion,user=user).first()
        if vote:
            if vote.vote == 'down':
                vote.vote = 'none'
                vote.save()
            else:
                vote.vote = 'down'
                vote.save()
        else:
            user.xp += 5
            user.level = xp_to_level(user.xp)
            user.save()
            DiscussionForumVote.objects.create(discussion=discussion,user=user,vote='down')
        return Response(status=status.HTTP_200_OK)
class UpvoteAnswerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, aid):
        discussion_answer = DiscussionForumAnswer.objects.get(id=aid)
        user = request.user
        vote = DiscussionForumAnswerVote.objects.filter(discussion=discussion_answer,user=user).first()
        if vote:
            if vote.vote == 'up':
                vote.vote = 'none'
                vote.save()
            else:
                vote.vote = 'up'
                vote.save()
        else:
            user.xp += 5
            user.level = xp_to_level(user.xp)
            user.save()
            DiscussionForumAnswerVote.objects.create(discussion=discussion_answer,user=user,vote='up')
        return Response(status=status.HTTP_200_OK)
class DownvoteAnswerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, aid):
        discussion_answer = DiscussionForumAnswer.objects.get(id=aid)
        user = request.user
        vote = DiscussionForumAnswerVote.objects.filter(discussion=discussion_answer,user=user).first()
        if vote:
            if vote.vote == 'down':
                vote.vote = 'none'
                vote.save()
            else:
                vote.vote = 'down'
                vote.save()
        else:
            user.xp += 5
            user.level = xp_to_level(user.xp)
            user.save()
            DiscussionForumAnswerVote.objects.create(discussion=discussion_answer,user=user,vote='down')
        return Response(status=status.HTTP_200_OK)
class AcceptAnswerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, fid, aid):
        discussion = DiscussionForum.objects.get(id=fid)
        user = request.user
        if discussion.user == user:
            answer = DiscussionForumAnswer.objects.get(id=aid)
            answer.is_accepted = True
            answer.save()
            discussion.is_resolved = True
            discussion.save()
            answer.user.xp += 50
            answer.user.level = xp_to_level(answer.user.xp)
            answer.user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)
class ResolvedView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        discussion = DiscussionForum.objects.get(id=pk)
        user = request.user
        if discussion.user == user:
            discussion.is_resolved = True
            discussion.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)



