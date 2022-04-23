import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { global, theme } from "../theme";
import { Comment } from "../types";
import { UserProvider, useUserContext } from "../User.provider";
import { TrashIcon } from "./Icons";

type CommentItemProps = {
  comment: Comment,
  removeComment: (id:number, userId: number) => void
}

export const CommentItem: React.FC<CommentItemProps> = ({comment, removeComment}) => {

  const {user} = useUserContext();


  const handleDelete = () => {
    removeComment(comment.id, comment.userId);
  }

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentWithButton}>
        <Text style={[styles.commentUser, global.semibold]}>{comment.user.username}:</Text>
        {comment.user.id === user!.id ? 
          <Pressable onPress={handleDelete}>
            <TrashIcon size={20}/>
          </Pressable>: undefined
        }
      </View>
      <Text style={[styles.commentBody, global.medium]}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentItem: {
    borderBottomColor:'#ccc',
    borderBottomWidth: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 20,
    color: theme.buttonColor,
    marginBottom: 5
  },
  commentBody: {
    color: theme.textDark,
    fontSize: 14,
    width: '100%'
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    fontWeight: '900'
  },
  commentWithButton: {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});