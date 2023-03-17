import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Card,
  Container,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  Interaction,
  InteractionWrapper,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import ProgressiveImage from './ProgressiveImage';
import {TouchableOpacity} from 'react-native';

const PostCard = ({item, onDelete, onPress}) => {
  const {user, logout} = useContext(AuthContext);

  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#333';
  const likeText =
    item.likes == 1
      ? '1 Like'
      : item.likes > 1
      ? `${item.likes} Likes`
      : 'Like';

  const commentText =
    item.comments == 1
      ? '1 Comment'
      : item.comments > 1
      ? `${item.comments} Comments`
      : 'Comment';

  return (
    <Card>
      <UserInfo>
        <UserImg source={{uri: item.userImg}} />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>{item.userName}</UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* {item.postImg !== null ? (
        <PostImg source={{uri: item.postImg}} />
      ) : (
        <Divider />
      )} */}
      {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons
            style={{color: 'black'}}
            name="md-chatbubble-outline"
            size={25}
          />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons style={{color: 'black'}} name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
